import React, { useState } from 'react';
import { Book, Star, Calendar, Search, Plus, TrendingUp, Heart, Eye, Sparkles, Filter } from 'lucide-react';

const ModernBookReviewSite = () => {
    const [books] = useState([
        {
            id: 1,
            title: '미드나잇 라이브러리',
            author: '매트 헤이그',
            rating: 5,
            date: '2024.10.15',
            review: '인생의 무한한 가능성에 대해 생각해보게 만드는 철학적인 소설이었습니다. 주인공 노라가 미드나잇 라이브러리에서 경험하는 다양한 삶들을 통해 현재의 삶에 대한 감사함을 느낄 수 있었습니다.',
            tags: ['철학', '판타지', '인생'],
            likes: 24,
            views: 156,
            color: 'from-purple-400 to-pink-400'
        },
        {
            id: 2,
            title: '아몬드',
            author: '손원평',
            rating: 4,
            date: '2024.10.08',
            review: '감정을 느끼지 못하는 소년의 성장 이야기가 감동적이었습니다. 타인을 이해하고 공감하는 것의 소중함을 다시 한번 깨닫게 되었습니다.',
            tags: ['청소년', '성장', '가족'],
            likes: 18,
            views: 89,
            color: 'from-blue-400 to-cyan-400'
        },
        {
            id: 3,
            title: '코스모스',
            author: '칼 세이건',
            rating: 5,
            date: '2024.09.28',
            review: '우주에 대한 경이로움과 과학적 사고의 중요성을 일깨워주는 명작입니다. 복잡한 과학 개념들을 이해하기 쉽게 설명해주어 과학에 대한 흥미가 더욱 커졌습니다.',
            tags: ['과학', '우주', '교양'],
            likes: 31,
            views: 203,
            color: 'from-emerald-400 to-teal-400'
        }
    ]);

    const [activeFilter, setActiveFilter] = useState('all');

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 transition-all duration-200 ${
                    i < rating
                        ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm'
                        : 'text-gray-300'
                }`}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Floating background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <header className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Book className="w-6 h-6 text-white" />
                                </div>
                                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    ReadVault
                                </h1>
                                <p className="text-gray-400 text-sm">나만의 독서 아카이브</p>
                            </div>
                        </div>

                        <button className="group relative px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center space-x-2">
                                <Plus className="w-5 h-5" />
                                <span>새 리뷰 작성</span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
                {/* Search and Filter */}
                <div className="mb-8 space-y-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="책 제목, 저자, 또는 태그로 검색하세요..."
                            className="w-full pl-12 pr-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Filter className="w-5 h-5 text-gray-400" />
                        {['all', 'fiction', 'non-fiction', 'science'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeFilter === filter
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {filter === 'all' ? '전체' : filter === 'fiction' ? '소설' : filter === 'non-fiction' ? '논픽션' : '과학'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: '총 독서량', value: books.length, icon: Book, color: 'from-blue-500 to-cyan-500' },
                        { label: '평균 평점', value: (books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1), icon: Star, color: 'from-yellow-500 to-orange-500' },
                        { label: '총 좋아요', value: books.reduce((sum, book) => sum + book.likes, 0), icon: Heart, color: 'from-pink-500 to-red-500' },
                        { label: '총 조회수', value: books.reduce((sum, book) => sum + book.views, 0), icon: TrendingUp, color: 'from-emerald-500 to-teal-500' }
                    ].map((stat, index) => (
                        <div key={index} className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"></div>
                            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-gray-400 text-sm">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Book Reviews Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {books.map((book, index) => (
                        <div key={book.id} className="group relative">
                            {/* Glow effect */}
                            <div className={`absolute -inset-1 bg-gradient-to-r ${book.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

                            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-[1.02]">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h3 className="text-xl font-bold text-white">{book.title}</h3>
                                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${book.color}`}></div>
                                        </div>
                                        <p className="text-gray-400 mb-3">by {book.author}</p>
                                        <div className="flex items-center space-x-4 text-sm">
                                            <div className="flex items-center space-x-1">
                                                {renderStars(book.rating)}
                                            </div>
                                            <div className="flex items-center space-x-1 text-gray-400">
                                                <Calendar className="w-4 h-4" />
                                                <span>{book.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-gray-300 leading-relaxed line-clamp-3">{book.review}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        {book.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded-full border border-white/20"
                                            >
                        #{tag}
                      </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                                        <div className="flex items-center space-x-1">
                                            <Heart className="w-4 h-4" />
                                            <span>{book.likes}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Eye className="w-4 h-4" />
                                            <span>{book.views}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <button className="text-purple-400 hover:text-purple-300 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                                        전체 리뷰 읽기 →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50"></div>
                        <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                            <Book className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">더 많은 책을 읽고 기록해보세요</h3>
                            <p className="text-gray-400 mb-6">당신의 독서 여정을 아름답게 기록하세요</p>
                            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-medium hover:shadow-xl transition-all duration-300 hover:scale-105">
                                새 독후감 작성하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernBookReviewSite;