import StaffLoginForm from '../../components/StaffLoginForm';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Staff Login - Computer Engineering Department',
  description: 'Access your staff dashboard. Login to manage courses, grades, and student information.',
  keywords: 'staff login, academic portal, computer engineering, university dashboard',
  authors: [{ name: 'Computer Engineering Department' }],
  openGraph: {
    title: 'Staff Login - Computer Engineering Department',
    description: 'Access your staff dashboard and manage academic information',
    type: 'website',
  },
}

export default function StaffLogin(){
    return (
        <StaffLoginForm />
    )
} 