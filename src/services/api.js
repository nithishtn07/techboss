// Centralized API service for Tech Boss
// Configured via VITE_API_URL environment variable

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

/**
 * Submits a community question to FastAPI POST /api/questions
 * @param {{ name: string, email: string, category: string, question: string }} payload
 */
export async function submitQuestionApi(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg =
        data?.message ||
        (typeof data?.detail === 'string' ? data.detail : null) ||
        'Unable to submit question right now. Please try again later.';
      return { success: false, message: errorMsg, isNetworkError: false };
    }

    return {
      success: data?.success ?? true,
      message: data?.message || 'Question submitted successfully',
    };
  } catch (err) {
    return {
      success: false,
      message:
        'Server is temporarily unavailable. Please check your connection and try again.',
      isNetworkError: true,
    };
  }
}

/**
 * Subscribes an email to the weekly newsletter via FastAPI POST /api/newsletter
 * @param {string} email
 */
export async function subscribeNewsletterApi(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg =
        data?.message ||
        (typeof data?.detail === 'string' ? data.detail : null) ||
        'Unable to process newsletter subscription. Please try again later.';
      return { success: false, message: errorMsg, isNetworkError: false };
    }

    return {
      success: data?.success ?? false,
      message: data?.message || 'Subscribed to newsletter successfully',
    };
  } catch (err) {
    return {
      success: false,
      message:
        'Newsletter server is currently unreachable. Please try again later.',
      isNetworkError: true,
    };
  }
}

/**
 * Fetches public community questions from FastAPI GET /api/questions
 * Safe public fields only (never exposes email addresses)
 * @param {number} limit
 */
export async function getQuestionsApi(limit = 20) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/questions?limit=${limit}`);
    if (!response.ok) {
      return {
        success: false,
        data: [],
        message: 'Unable to load community questions right now.',
      };
    }
    const data = await response.json();
    return {
      success: true,
      data: Array.isArray(data) ? data : [],
    };
  } catch (err) {
    return {
      success: false,
      data: [],
      message: 'Community services are temporarily unavailable.',
      isNetworkError: true,
    };
  }
}

/**
 * Fetches verified database metrics (total questions, total subscribers)
 */
export async function getStatsApi() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stats`);
    if (!response.ok) {
      return {
        success: false,
        data: { total_questions: 0, total_subscribers: 0 },
      };
    }
    const data = await response.json();
    return {
      success: true,
      data: {
        total_questions: Number(data?.total_questions) || 0,
        total_subscribers: Number(data?.total_subscribers) || 0,
      },
    };
  } catch (err) {
    return {
      success: false,
      data: { total_questions: 0, total_subscribers: 0 },
      isNetworkError: true,
    };
  }
}

