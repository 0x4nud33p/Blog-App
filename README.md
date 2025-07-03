# 📝 Blog App

A modern, full-stack blogging platform built with Next.js 14, featuring real-time interactions, user authentication, and a sleek responsive design.

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login system
- 💬 **Comment System** - Interactive commenting on blog posts
- 🔍 **Search Functionality** - Find blogs by title, content, or author
- 👤 **User Profiles** - Customizable user profiles with edit capabilities
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- 🌙 **Dark/Light Theme** - Toggle between themes for better UX
- ⚡ **Real-time Updates** - Dynamic content loading with Redux state management
- 📄 **Pagination** - Efficient content browsing
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** Redux Toolkit
- **Rich Text Editor:** Custom implementation

### Backend
- **API:** Next.js API Routes
- **Database:** Prisma ORM
- **Authentication:** Custom JWT implementation
- **File Handling:** Next.js built-in capabilities

### Development Tools
- **Language:** JavaScript
- **Linting:** ESLint
- **Package Manager:** npm/yarn
- **Database Management:** Prisma

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Database (PostgreSQL, MySQL, or SQLite)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/0x4nud33p/Blog-App.git
   cd Blog-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your-database-connection-string"
   
   # JWT Secret
   JWT_SECRET="your-super-secret-jwt-key"
   
   # Next.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
└── 0x4nud33p-blog-app/
    ├── app/                    # Next.js App Router
    │   ├── (router)/          # Route groups
    │   │   ├── _components/   # Shared components
    │   │   ├── home/         # Home page & blog details
    │   │   ├── myblog/       # User's personal blogs
    │   │   ├── search/       # Search functionality
    │   │   └── signup/       # User registration
    │   ├── api/              # API routes
    │   │   ├── (comment)/    # Comment operations
    │   │   ├── (posts)/      # Blog post operations
    │   │   ├── (update)/     # Update operations
    │   │   └── (user)/       # User operations
    │   └── redux/            # State management
    ├── components/           # Reusable UI components
    │   └── ui/              # shadcn/ui components
    ├── DB/                  # Database configuration
    ├── lib/                 # Utility functions
    ├── prisma/              # Database schema
    └── utils/               # Helper utilities
```

## 🎯 Usage

### Creating a Blog Post
1. Sign up or log in to your account
2. Navigate to "My Blogs" section
3. Click "Create New Post"
4. Use the rich text editor to write your content
5. Add a compelling title and publish

### Commenting on Posts
1. Browse to any blog post
2. Scroll to the comment section
3. Write your comment and submit
4. Engage with other readers' comments

### Managing Your Profile
1. Access your profile from the navigation menu
2. Update your username, email, and other details
3. View and manage your published blogs

## 🔧 API Endpoints

### Authentication
- `POST /api/user/signup` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout

### Blog Posts
- `GET /api/posts/post` - Get all blog posts
- `POST /api/posts/post` - Create new blog post
- `GET /api/posts/post/[id]` - Get specific blog post
- `GET /api/posts/search` - Search blog posts

### Comments
- `GET /api/comment/getcomment` - Get comments for a post
- `POST /api/comment/create` - Create new comment
- `DELETE /api/comment/deletecomment` - Delete comment

### User Updates
- `PUT /api/update/username` - Update username
- `PUT /api/update/useremail` - Update user email
- `PUT /api/update/updateTitle` - Update blog title
- `PUT /api/update/updatePara` - Update blog content

## 🌟 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add some amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features when applicable
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

If you encounter any issues or have questions:

- **Create an Issue:** [GitHub Issues](https://github.com/0x4nud33p/Blog-App/issues)
- **Discussions:** [GitHub Discussions](https://github.com/0x4nud33p/Blog-App/discussions)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database management with [Prisma](https://prisma.io/)

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/0x4nud33p/Blog-App?style=social)
![GitHub forks](https://img.shields.io/github/forks/0x4nud33p/Blog-App?style=social)
![GitHub issues](https://img.shields.io/github/issues/0x4nud33p/Blog-App)
![GitHub license](https://img.shields.io/github/license/0x4nud33p/Blog-App)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/0x4nud33p">0x4nud33p</a>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-contributing">Contributing</a>
</p>