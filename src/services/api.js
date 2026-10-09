// Centralized API service for Tech Boss
// Configured via VITE_API_URL environment variable

/**
 * Returns the normalized backend API base URL:
 * - Uses import.meta.env.VITE_API_URL if defined
 * - In production builds, default to https://techboss-backend.onrender.com
 * - In production builds, prevents localhost/127.0.0.1 from leaking
 * - In development, default to http://127.0.0.1:8000
 * - Strips trailing slashes
 * - Strips any trailing '/api' to prevent duplicate '/api/api/...' paths
 */
export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL;
  let baseUrl = '';

  if (envUrl && typeof envUrl === 'string' && envUrl.trim()) {
    baseUrl = envUrl.trim();
  } else if (import.meta.env.PROD) {
    baseUrl = 'https://techboss-backend.onrender.com';
  } else {
    baseUrl = 'http://127.0.0.1:8000';
  }

  // Safety: Prevent localhost/127.0.0.1 in production environments
  if (import.meta.env.PROD && (baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1'))) {
    baseUrl = 'https://techboss-backend.onrender.com';
  }

  // Strip trailing slashes
  baseUrl = baseUrl.replace(/\/+$/, '');

  // Strip any trailing '/api' so endpoints resolve to exact /api/... routes
  if (baseUrl.endsWith('/api')) {
    baseUrl = baseUrl.slice(0, -4);
  }

  return baseUrl;
}

export const API_BASE_URL = getApiBaseUrl();

/**
 * Helper to classify HTTP and network errors with specific user-friendly diagnostics
 */
function classifyError(status, data, err) {
  if (err || status === 0) {
    return {
      errorType: 'cors_or_network',
      message:
        'Backend server is unreachable. Please verify your internet connection or check CORS configuration.',
    };
  }

  if (status === 404) {
    return {
      errorType: 'not_found',
      message: 'The requested API endpoint was not found on the server (HTTP 404).',
    };
  }

  if (status === 422) {
    const errorMsg =
      data?.message ||
      (typeof data?.detail === 'string' ? data.detail : null) ||
      'Validation error: Please check all required fields and formats.';
    return {
      errorType: 'validation',
      message: errorMsg,
    };
  }

  if (status === 502 || status === 503 || status === 504) {
    return {
      errorType: 'service_unavailable',
      message:
        'Tech Boss backend service is currently waking up or temporarily unavailable on Render. Please try again in a few moments.',
    };
  }

  if (status >= 500) {
    return {
      errorType: 'server_error',
      message:
        data?.detail ||
        data?.message ||
        'Database or internal server error. Please try again shortly.',
    };
  }

  return {
    errorType: 'unknown',
    message: data?.message || data?.detail || `Request failed with HTTP status ${status}.`,
  };
}

/**
 * Submits a community question to FastAPI POST /api/questions
 * @param {{ name: string, email: string, category: string, question: string }} payload
 */
export async function submitQuestionApi(payload) {
  const url = `${getApiBaseUrl()}/api/questions`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errInfo = classifyError(response.status, data, null);
      return {
        success: false,
        message: errInfo.message,
        errorType: errInfo.errorType,
        status: response.status,
      };
    }

    return {
      success: data?.success ?? true,
      message: data?.message || 'Question submitted successfully',
      errorType: null,
      status: response.status,
    };
  } catch (err) {
    const errInfo = classifyError(0, null, err);
    return {
      success: false,
      message: errInfo.message,
      errorType: errInfo.errorType,
      status: 0,
    };
  }
}

/**
 * Subscribes an email to the weekly newsletter via FastAPI POST /api/newsletter
 * @param {string} email
 */
export async function subscribeNewsletterApi(email) {
  const url = `${getApiBaseUrl()}/api/newsletter`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errInfo = classifyError(response.status, data, null);
      return {
        success: false,
        message: errInfo.message,
        errorType: errInfo.errorType,
        status: response.status,
      };
    }

    return {
      success: data?.success ?? false,
      message: data?.message || 'Subscribed to newsletter successfully',
      errorType: null,
      status: response.status,
    };
  } catch (err) {
    const errInfo = classifyError(0, null, err);
    return {
      success: false,
      message: errInfo.message,
      errorType: errInfo.errorType,
      status: 0,
    };
  }
}

/**
 * Fetches public community questions from FastAPI GET /api/questions
 * Safe public fields only (never exposes email addresses)
 * @param {number} limit
 */
export async function getQuestionsApi(limit = 30) {
  const url = `${getApiBaseUrl()}/api/questions?limit=${limit}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errInfo = classifyError(response.status, data, null);
      return {
        success: false,
        data: [],
        message: errInfo.message,
        errorType: errInfo.errorType,
        status: response.status,
      };
    }

    return {
      success: true,
      data: Array.isArray(data) ? data : [],
      message: 'Questions loaded successfully',
      errorType: null,
      status: response.status,
    };
  } catch (err) {
    const errInfo = classifyError(0, null, err);
    return {
      success: false,
      data: [],
      message: errInfo.message,
      errorType: errInfo.errorType,
      status: 0,
    };
  }
}

/**
 * Fetches verified database metrics (total questions, total subscribers)
 */
export async function getStatsApi() {
  const url = `${getApiBaseUrl()}/api/stats`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errInfo = classifyError(response.status, data, null);
      return {
        success: false,
        data: null,
        message: errInfo.message,
        errorType: errInfo.errorType,
        status: response.status,
      };
    }

    return {
      success: true,
      data: {
        total_questions: Number(data?.total_questions) || 0,
        total_subscribers: Number(data?.total_subscribers) || 0,
      },
      errorType: null,
      status: response.status,
    };
  } catch (err) {
    const errInfo = classifyError(0, null, err);
    return {
      success: false,
      data: null,
      message: errInfo.message,
      errorType: errInfo.errorType,
      status: 0,
    };
  }
}
