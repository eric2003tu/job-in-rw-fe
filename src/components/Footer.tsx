// components/MinimalFooter.tsx
import Link from "next/link";
import { Heart, Mail, Phone, MapPin, Globe } from "lucide-react";

export default function MinimalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">JobInRW</span>
            </div>
            <p className="text-sm text-gray-400">
              Your gateway to career opportunities in Rwanda
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/jobs" className="text-sm text-gray-400 hover:text-white transition-colors">
                Browse Jobs
              </Link>
              <Link href="/post-job" className="text-sm text-gray-400 hover:text-white transition-colors">
                Post Job
              </Link>
              <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <a href="mailto:info@jobinrw.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  info@jobinrw.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <a href="tel:+250788123456" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +250 788 123 456
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} JobInRW. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">
              Terms
            </Link>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-rose-500" /> in Rwanda
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}