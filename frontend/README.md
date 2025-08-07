# Student Management System - Frontend

This is the frontend application for the Student Management System, built with [Next.js 15](https://nextjs.org) and [React 19](https://react.dev).

## 🚀 Features

- **Student Portal**: Registration, login, and profile management
- **Staff Portal**: Lecturer and admin access
- **Course Management**: View and manage courses
- **Grade Management**: Submit and view grades
- **Student Management**: View enrolled students
- **Responsive Design**: Modern UI with Tailwind CSS 4
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.5
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Build Tool**: SWC Compiler
- **Package Manager**: npm

## 📦 Getting Started

### Prerequisites
- Node.js 18+ (v22.13.1 recommended)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── login/         # Authentication endpoints
│   │   ├── register/      # Registration endpoints
│   │   └── staff/         # Staff-specific endpoints
│   ├── components/        # Reusable UI components
│   │   ├── Button.tsx     # Button component
│   │   ├── Form.tsx       # Form components
│   │   ├── Input.tsx      # Input components
│   │   ├── LoginForm.tsx  # Login form
│   │   ├── RegisterForm.tsx # Registration form
│   │   ├── Sidebar.tsx    # Navigation sidebar
│   │   └── PageHeader.tsx # Page headers
│   ├── dashboard/         # Main dashboard
│   ├── lecturer/          # Lecturer portal
│   │   ├── courses/       # Course management
│   │   │   └── [id]/      # Dynamic course pages
│   │   │       ├── students/ # Student management
│   │   │       └── grades/   # Grade management
│   │   └── layout.tsx     # Lecturer layout
│   ├── student/           # Student portal
│   │   ├── login/         # Student login
│   │   └── register/      # Student registration
│   ├── staff/             # Staff portal
│   │   ├── login/         # Staff login
│   │   └── register/      # Staff registration
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Additional components
│   ├── Enrollments.tsx    # Enrollment management
│   ├── Fees.tsx           # Fee management
│   └── Profile.tsx        # Profile components
└── lib/                   # Utility libraries
    ├── api.ts             # API client
    └── utils.ts           # Utility functions
```

## 🔧 Configuration

### Environment Variables
- **API URL**: Configured to connect to backend at `http://localhost:8081/api`
- **Port**: Runs on port 3000 by default

### Next.js Configuration
- **SWC Compiler**: Pre-configured and working
- **TypeScript**: Strict mode enabled
- **Tailwind CSS**: Version 4 with modern features

## 🧪 Testing

### Manual Testing
1. **Student Registration/Login**: Test at `/student/register` and `/student/login`
2. **Staff Registration/Login**: Test at `/staff/register` and `/staff/login`
3. **Course Management**: Test lecturer features at `/lecturer/courses`
4. **Grade Management**: Test grade submission at `/lecturer/courses/[id]/grades`
5. **Student Management**: Test student list at `/lecturer/courses/[id]/students`

### API Integration
The frontend connects to the backend API endpoints:
- Authentication: `/api/login`, `/api/register`
- Students: `/api/students`
- Courses: `/api/courses`
- Lecturers: `/api/lecturers`
- Enrollments: `/api/enrollments`

## 🐛 Troubleshooting

### Common Issues

1. **SWC Binary Issues**
   - **Issue**: Network timeout during download
   - **Solution**: SWC binary has been pre-downloaded and placed in correct locations

2. **Build Errors**
   - Ensure Node.js 18+ is installed
   - Clear npm cache: `npm cache clean --force`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

3. **TypeScript Errors**
   - All components have been updated for Next.js 15 async params
   - Run `npm run build` to check for any remaining issues

4. **API Connection Issues**
   - Ensure backend is running on port 8081
   - Check API URL configuration in `lib/api.ts`
   - Verify CORS is enabled on backend

## 📝 Development Notes

### Next.js 15 Compatibility
- All page components updated for async params
- Proper TypeScript interfaces for all props
- SWC compiler configured and working

### Component Architecture
- Reusable components with proper TypeScript types
- Responsive design with Tailwind CSS
- Modern React patterns with hooks

### API Integration
- Centralized API client in `lib/api.ts`
- Proper error handling and loading states
- JWT token management for authentication

## ✅ Current Status

**Frontend is fully operational:**
- ✅ Next.js 15.4.5 running successfully
- ✅ React 19.1.0 with all features working
- ✅ TypeScript compilation successful
- ✅ SWC compiler configured and working
- ✅ All pages and components functional
- ✅ API integration working
- ✅ Responsive design implemented

**Ready for development and production deployment! 🚀**

## 🚀 Deployment

The application is ready for deployment on:
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative deployment option
- **Docker**: Containerized deployment available

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
