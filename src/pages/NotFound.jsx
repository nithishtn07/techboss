import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, Compass } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="pt-32 pb-24 min-h-[80vh] flex items-center justify-center text-center px-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,229,255,0.2)]">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-tech text-cyan-400 font-bold uppercase tracking-widest">
            ERROR 404
          </span>
          <h1 className="text-3xl font-black font-display text-white">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            The tech story or archive link you requested does not exist or has been relocated.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button variant="primary" size="md" icon={Home} iconPosition="left">
              Return Home
            </Button>
          </Link>
          <Link to="/tech-hub">
            <Button variant="secondary" size="md" icon={Compass} iconPosition="left">
              Explore Tech Hub
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
