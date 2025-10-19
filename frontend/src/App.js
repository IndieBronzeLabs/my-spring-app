import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Bookmark, Send, Search, Bell, User, Home, Compass, Users, Mail, Menu, X, MoreHorizontal, MapPin, Gamepad2, Trophy, Clock, Mic, MicOff, UserPlus, Zap, TrendingUp } from 'lucide-react';

export default function App() {
    const [activeTab, setActiveTab] = useState('home');
    const [likedPosts, setLikedPosts] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const posts = [
        {
            id: 1,
            type: 'normal',
            user: {
                name: '김민지',
                username: '@minji_game',
                avatar: 'https://i.pravatar.cc/150?img=1',
                age: 25,
                games: [
                    { name: 'League of Legends', tier: 'Gold II', role: 'Support' },
                    { name: 'Valorant', tier: 'Platinum', role: 'Controller' }
                ],
                playStyle: ['Team-oriented', 'Voice'],
                playTime: '21:00-24:00'
            },
            content: '오늘 카페에서 공부하다가 찍은 하늘 ☁️ 날씨 진짜 좋았어요!',
            images: ['https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=600&h=600&fit=crop'],
            likes: 234,
            comments: 45,
            timestamp: '2시간 전'
        },
        {
            id: 2,
            type: 'party',
            user: {
                name: '박지훈',
                username: '@jihun_gg',
                avatar: 'https://i.pravatar.cc/150?img=2',
                age: 27,
                games: [
                    { name: 'League of Legends', tier: 'Platinum I', role: 'Jungle' },
                    { name: 'PUBG', tier: 'Diamond', role: 'Assault' }
                ],
                playStyle: ['Aggressive', 'Carry'],
                playTime: '22:00+'
            },
            content: '지금 롤 노말 같이 하실 분! 편하게 재미로 하실 분 구해요 😊',
            partyInfo: {
                game: 'League of Legends',
                mode: 'Normal',
                needed: '2명',
                voice: true,
                now: true
            },
            likes: 89,
            comments: 23,
            timestamp: '30분 전'
        },
        {
            id: 3,
            type: 'game',
            user: {
                name: '이서연',
                username: '@seoyeon_fps',
                avatar: 'https://i.pravatar.cc/150?img=3',
                age: 24,
                games: [
                    { name: 'Valorant', tier: 'Diamond', role: 'Duelist' },
                    { name: 'Overwatch 2', tier: 'Master', role: 'DPS' }
                ],
                playStyle: ['Aggressive', 'Fragger'],
                playTime: 'Weekend'
            },
            content: '발로란트 에이스 떴다!! 🔥 오늘 컨디션 미쳤음',
            images: [
                'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=600&fit=crop',
                'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=600&fit=crop'
            ],
            gameHighlight: {
                game: 'Valorant',
                achievement: 'Ace',
                kda: '18/3/5'
            },
            likes: 456,
            comments: 89,
            timestamp: '4시간 전'
        },
        {
            id: 4,
            type: 'normal',
            user: {
                name: '최유진',
                username: '@yujin_lol',
                avatar: 'https://i.pravatar.cc/150?img=4',
                age: 26,
                games: [
                    { name: 'League of Legends', tier: 'Gold III', role: 'ADC' }
                ],
                playStyle: ['Safe', 'Farm-focused'],
                playTime: 'Evening'
            },
            content: '주말에 친구들이랑 놀러갔다 왔어요 🎉 너무 재밌었다!\n다음주부터 다시 열심히 게임해야지',
            images: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop'],
            likes: 178,
            comments: 34,
            timestamp: '1일 전'
        }
    ];

    const recommendedGamers = [
        {
            id: 5,
            name: '강태민',
            username: '@taemin_carry',
            avatar: 'https://i.pravatar.cc/150?img=5',
            age: 28,
            games: [
                { name: 'League of Legends', tier: 'Platinum II' },
                { name: 'Valorant', tier: 'Diamond' }
            ],
            playStyle: ['Carry', 'Ranked'],
            matchScore: 92,
            reason: '같은 게임, 비슷한 티어'
        },
        {
            id: 6,
            name: '윤서아',
            username: '@seoa_support',
            avatar: 'https://i.pravatar.cc/150?img=6',
            age: 23,
            games: [
                { name: 'League of Legends', tier: 'Gold I' },
                { name: 'Overwatch 2', tier: 'Platinum' }
            ],
            playStyle: ['Support', 'Team'],
            matchScore: 88,
            reason: '플레이 스타일 궁합'
        }
    ];

    const toggleLike = (postId) => {
        setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    return (
        <div className="min-h-screen bg-neutral-950">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-800 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                            >
                                {sidebarOpen ? <X className="w-5 h-5 text-neutral-300" /> : <Menu className="w-5 h-5 text-neutral-300" />}
                            </button>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                                    <Gamepad2 className="w-5 h-5 text-neutral-900" />
                                </div>
                                <span className="text-xl font-semibold text-neutral-100">
                  GameMate
                </span>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="게임, 유저 검색..."
                                    className="w-full pl-12 pr-4 py-2 bg-neutral-800 text-neutral-100 rounded-lg border border-neutral-700 focus:outline-none focus:border-neutral-600 transition-all placeholder-neutral-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors relative">
                                <Bell className="w-5 h-5 text-neutral-300" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
                            </button>
                            <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                                <User className="w-5 h-5 text-neutral-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Container */}
            <div className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
                <div className="flex gap-6">
                    {/* Left Sidebar */}
                    <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:sticky top-20 left-0 w-64 h-fit z-40`}>
                        <div className="bg-neutral-900 rounded-xl p-3 border border-neutral-800">
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab('home')}
                                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                                        activeTab === 'home'
                                            ? 'bg-neutral-100 text-neutral-900'
                                            : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
                                    }`}
                                >
                                    <Home className="w-5 h-5" />
                                    <span>홈</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('party')}
                                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                                        activeTab === 'party'
                                            ? 'bg-neutral-100 text-neutral-900'
                                            : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
                                    }`}
                                >
                                    <Users className="w-5 h-5" />
                                    <span>파티 찾기</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('discover')}
                                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                                        activeTab === 'discover'
                                            ? 'bg-neutral-100 text-neutral-900'
                                            : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
                                    }`}
                                >
                                    <Compass className="w-5 h-5" />
                                    <span>발견</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('messages')}
                                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                                        activeTab === 'messages'
                                            ? 'bg-neutral-100 text-neutral-900'
                                            : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800'
                                    }`}
                                >
                                    <Mail className="w-5 h-5" />
                                    <span>메시지</span>
                                </button>
                            </nav>

                            <button className="w-full mt-3 bg-neutral-100 text-neutral-900 py-2.5 rounded-lg text-sm font-semibold hover:bg-neutral-200 transition-all">
                                게시하기
                            </button>
                        </div>

                        {/* My Games */}
                        <div className="mt-4 bg-neutral-900 rounded-xl p-4 border border-neutral-800">
                            <h3 className="text-neutral-100 font-semibold mb-3 text-sm">내 게임</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-neutral-800 rounded-lg">
                                    <div>
                                        <p className="text-neutral-100 text-sm font-medium">League of Legends</p>
                                        <p className="text-neutral-400 text-xs">Gold II</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-neutral-800 rounded-lg">
                                    <div>
                                        <p className="text-neutral-100 text-sm font-medium">Valorant</p>
                                        <p className="text-neutral-400 text-xs">Platinum</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Feed */}
                    <main className="flex-1 lg:ml-0 ml-0">
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <article key={post.id} className={`bg-neutral-900 rounded-xl border overflow-hidden hover:border-neutral-700 transition-all ${
                                    post.type === 'party' ? 'border-blue-500/50' : 'border-neutral-800'
                                }`}>
                                    {/* Party Badge */}
                                    {post.type === 'party' && (
                                        <div className="bg-blue-500/10 border-b border-blue-500/20 px-4 py-2 flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Users className="w-4 h-4 text-blue-400" />
                                                <span className="text-blue-400 text-sm font-medium">파티 모집</span>
                                            </div>
                                            {post.partyInfo?.now && (
                                                <span className="px-2 py-0.5 bg-blue-500/20 rounded text-blue-400 text-xs font-medium flex items-center space-x-1">
                          <Zap className="w-3 h-3" />
                          <span>지금</span>
                        </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Game Highlight Badge */}
                                    {post.type === 'game' && post.gameHighlight && (
                                        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center space-x-2">
                                            <Trophy className="w-4 h-4 text-amber-400" />
                                            <span className="text-amber-400 text-sm font-medium">
                        {post.gameHighlight.game} - {post.gameHighlight.achievement}
                      </span>
                                            <span className="text-neutral-400 text-sm">
                        KDA {post.gameHighlight.kda}
                      </span>
                                        </div>
                                    )}

                                    <div className="p-5">
                                        {/* Post Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-start space-x-3 flex-1">
                                                <img
                                                    src={post.user.avatar}
                                                    alt={post.user.name}
                                                    className="w-12 h-12 rounded-full cursor-pointer"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <h3 className="font-semibold text-neutral-100 text-sm">{post.user.name}</h3>
                                                        <span className="text-neutral-500 text-xs">{post.user.age}</span>
                                                    </div>
                                                    <p className="text-xs text-neutral-500 mb-2">{post.user.username} · {post.timestamp}</p>

                                                    {/* User Games */}
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {post.user.games.map((game, idx) => (
                                                            <div key={idx} className="inline-flex items-center space-x-1.5 px-2 py-1 bg-neutral-800 rounded text-xs">
                                                                <span className="text-neutral-300 font-medium">{game.name}</span>
                                                                <span className="text-neutral-500">·</span>
                                                                <span className="text-neutral-400">{game.tier}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Play Style */}
                                                    <div className="flex flex-wrap gap-1">
                                                        {post.user.playStyle.map((style, idx) => (
                                                            <span key={idx} className="px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded text-xs">
                                {style}
                              </span>
                                                        ))}
                                                        <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded text-xs flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.user.playTime}</span>
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="text-neutral-500 hover:text-neutral-300 p-1.5 hover:bg-neutral-800 rounded-lg transition-all">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Party Info */}
                                        {post.type === 'party' && post.partyInfo && (
                                            <div className="mb-4 p-3 bg-neutral-800/50 rounded-lg border border-neutral-700">
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div className="flex items-center space-x-2">
                                                        <Gamepad2 className="w-3.5 h-3.5 text-neutral-400" />
                                                        <span className="text-neutral-300 font-medium">{post.partyInfo.game}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Users className="w-3.5 h-3.5 text-neutral-400" />
                                                        <span className="text-neutral-300">{post.partyInfo.needed}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Trophy className="w-3.5 h-3.5 text-neutral-400" />
                                                        <span className="text-neutral-300">{post.partyInfo.mode}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        {post.partyInfo.voice ? (
                                                            <>
                                                                <Mic className="w-3.5 h-3.5 text-green-400" />
                                                                <span className="text-green-400">Voice</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <MicOff className="w-3.5 h-3.5 text-neutral-500" />
                                                                <span className="text-neutral-500">No voice</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Post Content */}
                                        <p className="text-neutral-200 leading-relaxed mb-4 text-sm">{post.content}</p>

                                        {/* Post Images */}
                                        {post.images && post.images.length > 0 && (
                                            <div className={`grid ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 mb-4`}>
                                                {post.images.map((img, idx) => (
                                                    <div key={idx} className="relative overflow-hidden rounded-lg group">
                                                        <img
                                                            src={img}
                                                            alt=""
                                                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Post Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                                            <div className="flex items-center space-x-6">
                                                <button
                                                    onClick={() => toggleLike(post.id)}
                                                    className="flex items-center space-x-2 group"
                                                >
                                                    <Heart
                                                        className={`w-5 h-5 transition-all ${
                                                            likedPosts[post.id]
                                                                ? 'fill-red-500 text-red-500'
                                                                : 'text-neutral-500 group-hover:text-red-500'
                                                        }`}
                                                    />
                                                    <span className={`text-sm ${likedPosts[post.id] ? 'text-red-500' : 'text-neutral-500'}`}>
                            {post.likes + (likedPosts[post.id] ? 1 : 0)}
                          </span>
                                                </button>
                                                <button className="flex items-center space-x-2 group">
                                                    <MessageCircle className="w-5 h-5 text-neutral-500 group-hover:text-blue-400 transition-colors" />
                                                    <span className="text-sm text-neutral-500">{post.comments}</span>
                                                </button>
                                            </div>

                                            {post.type === 'party' ? (
                                                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all">
                                                    참여하기
                                                </button>
                                            ) : (
                                                <button className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5">
                                                    <UserPlus className="w-4 h-4" />
                                                    <span>같이하기</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </main>

                    {/* Right Sidebar */}
                    <aside className="hidden xl:block w-80 sticky top-20 h-fit space-y-4">
                        {/* Recommended Gamers */}
                        <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
                            <h2 className="text-sm font-semibold text-neutral-100 mb-3 flex items-center space-x-2">
                                <TrendingUp className="w-4 h-4" />
                                <span>추천 게이머</span>
                            </h2>
                            <div className="space-y-3">
                                {recommendedGamers.map((gamer) => (
                                    <div key={gamer.id} className="p-3 bg-neutral-800/50 rounded-lg hover:bg-neutral-800 transition-all cursor-pointer">
                                        <div className="flex items-start space-x-3 mb-2">
                                            <img
                                                src={gamer.avatar}
                                                alt={gamer.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-1.5">
                                                        <h3 className="font-semibold text-neutral-100 text-sm">{gamer.name}</h3>
                                                        <span className="text-neutral-500 text-xs">{gamer.age}</span>
                                                    </div>
                                                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs font-medium">
                            {gamer.matchScore}%
                          </span>
                                                </div>
                                                <p className="text-xs text-neutral-500">{gamer.username}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {gamer.games.map((game, idx) => (
                                                <span key={idx} className="text-xs px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded">
                          {game.name} {game.tier}
                        </span>
                                            ))}
                                        </div>

                                        <p className="text-xs text-neutral-500 mb-2">{gamer.reason}</p>

                                        <button className="w-full px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-lg text-xs font-medium transition-all">
                                            프로필 보기
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Active Now */}
                        <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
                            <h2 className="text-sm font-semibold text-neutral-100 mb-2 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>온라인</span>
                            </h2>
                            <p className="text-xs text-neutral-500">현재 12명 활동 중</p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}