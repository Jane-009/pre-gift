import React, { useState } from 'react';

const BookshelfSection = () => {
  const [openBook, setOpenBook] = useState(null);

  const books = [
    {
      id: 1,
      title: "Chronicles of Joy",
      color: "bg-magical-bronze",
      content: "Every laugh, every smile, every moment of pure happiness we've shared is written in golden ink within these pages. Each chapter tells a story of joy that lights up the darkest days."
    },
    {
      id: 2,
      title: "Adventures Together",
      color: "bg-magical-mahogany",
      content: "From spontaneous journeys to planned escapades, this tome holds the essence of our adventures. Every path we've walked, every destination we've reached, every memory we've made along the way."
    },
    {
      id: 3,
      title: "Secrets of the Heart",
      color: "bg-magical-golden-brown",
      content: "The whispered secrets, the shared dreams, the deepest thoughts we've entrusted to each other. This book glows with the warmth of trust and the magic of true understanding."
    },
    {
      id: 4,
      title: "Wisdom & Wonder",
      color: "bg-magical-warm-brown",
      content: "All the lessons we've learned together, the wisdom we've gained, and the wonder we've discovered in each other. These pages shimmer with the light of growth and transformation."
    },
    {
      id: 5,
      title: "Dreams & Aspirations",
      color: "bg-magical-chocolate",
      content: "Our shared dreams, our individual aspirations, and the future we're building together. Each page turns toward tomorrow, filled with hope and infinite possibilities."
    },
    {
      id: 6,
      title: "Love's Eternal Song",
      color: "bg-gradient-bronze",
      content: "The most precious volume of all - a collection of every 'I love you,' every tender moment, every beat of our hearts in harmony. This book will never end, as our love story continues to unfold."
    }
  ];

  const toggleBook = (bookId) => {
    setOpenBook(openBook === bookId ? null : bookId);
  };

  return (
    <section className="section-container">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-serif text-magical-moon text-center mb-12 text-shadow-magical">
          Memory Bookshelf
        </h2>
        
        <div className="glass-enhanced p-8 rounded-3xl">
          {/* Bookshelf frame */}
          <div className="bg-magical-warm-brown bg-opacity-20 p-6 rounded-2xl mb-6">
            <div className="text-center mb-8">
              <p className="text-magical-bronze font-elegant">
                Click on any book to open it and discover the memories within...
              </p>
            </div>
            
            {/* Books grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {books.map((book) => (
                <div
                  key={book.id}
                  className={`${book.color} p-4 rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-magical-bronze ${
                    openBook === book.id ? 'ring-4 ring-magical-gold' : ''
                  }`}
                  onClick={() => toggleBook(book.id)}
                >
                  <div className="text-magical-moon font-serif text-center">
                    <div className="text-sm mb-2">📚</div>
                    <h3 className="text-sm font-bold leading-tight">{book.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Open book content */}
          {openBook && (
            <div className="glass-effect p-8 rounded-2xl animate-fade-in">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-serif text-magical-moon">
                    {books.find(b => b.id === openBook)?.title}
                  </h3>
                  <button
                    onClick={() => setOpenBook(null)}
                    className="text-magical-bronze hover:text-magical-gold transition-colors duration-300"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-magical-silver font-elegant text-lg leading-relaxed">
                    {books.find(b => b.id === openBook)?.content}
                  </p>
                </div>
                
                <div className="mt-8 text-center">
                  <div className="w-16 h-1 bg-magical-bronze mx-auto rounded-full"></div>
                  <p className="text-magical-bronze font-elegant text-sm mt-4">
                    ~ Written in the language of the heart ~
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-magical-bronze font-elegant">
            ✨ Each book holds a chapter of our story ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookshelfSection;