import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Feather, Mail, Lock, User as UserIcon, Phone } from 'lucide-react';

function LoginPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        phone: '',
        agreeTerms: false,
        agreePrivacy: false,
        agreeMarketing: false
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignupChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSignupData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        alert('로그인 성공!');
        navigate('/');
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        if (signupData.password !== signupData.passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!signupData.agreeTerms || !signupData.agreePrivacy) {
            alert('필수 약관에 동의해주세요.');
            return;
        }
        alert('회원가입 성공!');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-12 px-4" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover opacity-20"
                />
            </div>

            {/* Login/Signup Container */}
            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center mb-8">
                    <Feather className="w-8 h-8 mr-3 text-zinc-900" />
                    <div>
                        <h1 className="text-3xl font-serif tracking-wider text-zinc-900">
                            BIBLIOTHECA
                        </h1>
                        <p className="text-xs tracking-widest font-light text-zinc-500 text-center">
                            FINE LITERATURE
                        </p>
                    </div>
                </Link>

                <div className="bg-white rounded-lg shadow-2xl p-8">
                    {/* Tab Switcher */}
                    <div className="flex mb-8 bg-zinc-100 rounded-lg p-1">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 rounded-lg transition-colors font-light ${
                                isLogin
                                    ? 'bg-white text-zinc-900 shadow'
                                    : 'text-zinc-500 hover:text-zinc-900'
                            }`}
                        >
                            로그인
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 rounded-lg transition-colors font-light ${
                                !isLogin
                                    ? 'bg-white text-zinc-900 shadow'
                                    : 'text-zinc-500 hover:text-zinc-900'
                            }`}
                        >
                            회원가입
                        </button>
                    </div>

                    {/* Login Form */}
                    {isLogin ? (
                        <form onSubmit={handleLoginSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm text-zinc-600 mb-2">이메일</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={loginData.email}
                                        onChange={handleLoginChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                        placeholder="email@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-600 mb-2">비밀번호</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" className="mr-2" />
                                    <span className="text-zinc-600">로그인 상태 유지</span>
                                </label>
                                <a href="#" className="text-zinc-600 hover:text-zinc-900">
                                    비밀번호 찾기
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-zinc-900 text-white py-4 rounded-lg hover:bg-zinc-800 transition-colors font-light tracking-wider"
                            >
                                로그인
                            </button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-zinc-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-zinc-500">또는</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="button"
                                    className="w-full border border-zinc-300 text-zinc-700 py-3 rounded-lg hover:bg-zinc-50 transition-colors font-light flex items-center justify-center space-x-2"
                                >
                                    <span>카카오 로그인</span>
                                </button>
                                <button
                                    type="button"
                                    className="w-full border border-zinc-300 text-zinc-700 py-3 rounded-lg hover:bg-zinc-50 transition-colors font-light flex items-center justify-center space-x-2"
                                >
                                    <span>네이버 로그인</span>
                                </button>
                            </div>
                        </form>
                    ) : (
                        /* Signup Form */
                        <form onSubmit={handleSignupSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm text-zinc-600 mb-2">이름 *</label>
                                <div className="relative">
                                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={signupData.name}
                                        onChange={handleSignupChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                        placeholder="홍길동"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-600 mb-2">이메일 *</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={signupData.email}
                                        onChange={handleSignupChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                        placeholder="email@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-600 mb-2">연락처 *</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={signupData.phone}
                                        onChange={handleSignupChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                        placeholder="010-1234-5678"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-600 mb-2">비밀번호 *</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={signupData.password}
                                        onChange={handleSignupChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                        placeholder="8자 이상 입력하세요"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-600 mb-2">비밀번호 확인 *</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                    <input
                                        type="password"
                                        name="passwordConfirm"
                                        value={signupData.passwordConfirm}
                                        onChange={handleSignupChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                        placeholder="비밀번호를 다시 입력하세요"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 space-y-3 border-t border-zinc-200">
                                <label className="flex items-start cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        checked={signupData.agreeTerms}
                                        onChange={handleSignupChange}
                                        className="mt-1 mr-3"
                                    />
                                    <span className="text-sm text-zinc-700">
                    <span className="text-red-600">[필수]</span> 이용약관에 동의합니다
                  </span>
                                </label>

                                <label className="flex items-start cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="agreePrivacy"
                                        checked={signupData.agreePrivacy}
                                        onChange={handleSignupChange}
                                        className="mt-1 mr-3"
                                    />
                                    <span className="text-sm text-zinc-700">
                    <span className="text-red-600">[필수]</span> 개인정보 수집 및 이용에 동의합니다
                  </span>
                                </label>

                                <label className="flex items-start cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="agreeMarketing"
                                        checked={signupData.agreeMarketing}
                                        onChange={handleSignupChange}
                                        className="mt-1 mr-3"
                                    />
                                    <span className="text-sm text-zinc-700">
                    [선택] 마케팅 정보 수신에 동의합니다
                  </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-zinc-900 text-white py-4 rounded-lg hover:bg-zinc-800 transition-colors font-light tracking-wider"
                            >
                                회원가입
                            </button>
                        </form>
                    )}
                </div>

                <p className="text-center mt-6 text-sm text-zinc-600">
                    <Link to="/" className="hover:text-zinc-900 transition-colors">
                        홈으로 돌아가기
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;