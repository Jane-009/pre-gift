/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'magical': {
          'dark': '#1a1a2e',
          'navy': '#16213e',
          'silver': '#e5e7eb',
          'lavender': '#c7b8ea',
          'gold': '#f59e0b',
          'bronze': '#cd7f32',
          'chocolate': '#3c1f1a',
          'mahogany': '#c04000',
          'golden-brown': '#996633',
          'warm-brown': '#8b4513',
          'moon': '#f8fafc',
          'star': '#fbbf24'
        }
      },
      fontFamily: {
        'serif': ['Cormorant Garamond', 'Playfair Display', 'serif'],
        'elegant': ['Lora', 'serif'],
        'script': ['Dancing Script', 'cursive']
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'rotate-slow': 'rotate 10s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 1s ease-out',
        'shimmer': 'shimmer 2s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        twinkle: {
          '0%': { opacity: '0.3', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1.2)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(248, 250, 252, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(248, 250, 252, 0.8)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      backdropBlur: {
        'xs': '2px'
      },
      backgroundImage: {
        'gradient-magical': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #e5e7eb 50%, #c7b8ea 75%, #3c1f1a 100%)',
        'gradient-bronze': 'linear-gradient(135deg, #cd7f32 0%, #996633 50%, #8b4513 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
      }
    },
  },
  plugins: [],
}