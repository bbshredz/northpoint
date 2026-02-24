// NorthPoint auth.js
// Drop <script src="../auth.js"></script> (or ./auth.js from root) 
// at the top of <body> on any page you want gated.

(function () {
    const PASSWORD     = 'onwardandupward';
    const SESSION_KEY  = 'np-auth';
    const CURRENT_PATH = location.pathname;

    // Already authenticated this session
    if (sessionStorage.getItem(SESSION_KEY) === 'true') return;

    // Inject gate styles
    const style = document.createElement('style');
    style.textContent = `
        #np-gate {
            position: fixed;
            inset: 0;
            background: #0f172a;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'DM Sans', sans-serif;
        }
        #np-gate-box {
            background: #1e293b;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 20px;
            padding: 48px;
            width: 100%;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 24px 64px rgba(0,0,0,0.5);
        }
        #np-gate-logo {
            width: 48px;
            height: 48px;
            background: #3b82f6;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            box-shadow: 0 0 24px rgba(59,130,246,0.35);
        }
        #np-gate-title {
            font-family: 'DM Serif Display', serif;
            font-size: 26px;
            color: #f1f5f9;
            margin-bottom: 6px;
            letter-spacing: -0.3px;
        }
        #np-gate-sub {
            font-size: 13px;
            color: #64748b;
            margin-bottom: 32px;
            font-weight: 300;
        }
        #np-gate-input {
            width: 100%;
            background: #0f172a;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 10px;
            padding: 13px 16px;
            font-size: 14px;
            color: #f1f5f9;
            outline: none;
            text-align: center;
            letter-spacing: 2px;
            font-family: 'DM Sans', sans-serif;
            margin-bottom: 12px;
            transition: border-color 0.2s;
        }
        #np-gate-input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
        }
        #np-gate-input.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239,68,68,0.15);
            animation: shake 0.3s ease;
        }
        #np-gate-btn {
            width: 100%;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 10px;
            padding: 13px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            font-family: 'DM Sans', sans-serif;
            transition: background 0.2s, transform 0.1s;
        }
        #np-gate-btn:hover { background: #2563eb; }
        #np-gate-btn:active { transform: scale(0.98); }
        #np-gate-error {
            font-size: 12px;
            color: #ef4444;
            margin-top: 10px;
            height: 16px;
            transition: opacity 0.2s;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25%       { transform: translateX(-6px); }
            75%       { transform: translateX(6px); }
        }
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;600&display=swap');
    `;
    document.head.appendChild(style);

    // Inject gate HTML
    const gate = document.createElement('div');
    gate.id = 'np-gate';
    gate.innerHTML = `
        <div id="np-gate-box">
            <div id="np-gate-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
            </div>
            <div id="np-gate-title">NorthPoint</div>
            <div id="np-gate-sub">Enter your access code to continue</div>
            <input id="np-gate-input" type="password" placeholder="· · · · · · · · · · · ·" autocomplete="off" />
            <button id="np-gate-btn">Continue</button>
            <div id="np-gate-error"></div>
        </div>
    `;
    document.body.appendChild(gate);

    // Prevent page scroll while locked
    document.body.style.overflow = 'hidden';

    const input = document.getElementById('np-gate-input');
    const btn   = document.getElementById('np-gate-btn');
    const error = document.getElementById('np-gate-error');

    function attempt() {
        if (input.value.trim().toLowerCase() === PASSWORD) {
            sessionStorage.setItem(SESSION_KEY, 'true');
            gate.style.opacity = '0';
            gate.style.transition = 'opacity 0.3s ease';
            document.body.style.overflow = '';
            setTimeout(() => gate.remove(), 300);
        } else {
            input.classList.add('error');
            error.textContent = 'Incorrect access code.';
            input.value = '';
            setTimeout(() => input.classList.remove('error'), 600);
        }
    }

    btn.addEventListener('click', attempt);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') attempt(); });
    input.focus();
})();