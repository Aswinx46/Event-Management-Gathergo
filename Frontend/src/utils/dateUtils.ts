import { isAfter, startOfDay, startOfMonth, startOfWeek, startOfYear, format, formatDistance } from "date-fns";

export const formatMessageTime = (dateString: string): string => {
    const messageDate = new Date(dateString);
    const now = new Date();
    
    const isToday = messageDate.getDate() === now.getDate() &&
                    messageDate.getMonth() === now.getMonth() &&
                    messageDate.getFullYear() === now.getFullYear();
    
    if (isToday) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    
    const isYesterday = messageDate.getDate() === yesterday.getDate() &&
                        messageDate.getMonth() === yesterday.getMonth() &&
                        messageDate.getFullYear() === yesterday.getFullYear();
    
    if (isYesterday) {
      return 'Yesterday';
    }
    
    const isThisYear = messageDate.getFullYear() === now.getFullYear();
    
    if (isThisYear) {
      return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    return messageDate.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
  };

  export function formatDate(date: Date | string): string {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return format(parsedDate, 'MMM dd, yyyy');
  }
  
  export function formatDateTime(date: Date | string): string {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return format(parsedDate, 'MMM dd, yyyy - h:mm a');
  }
  
  export function formatTimeAgo(date: Date | string): string {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return formatDistance(parsedDate, new Date(), { addSuffix: true });
  }
  
  
  
  export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  }
  
  export function isInTimePeriod(date: Date | string, period: 'today' | 'this-week' | 'this-month' | 'this-year' | 'all'): boolean {
    if (period === 'all') return true;
    
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    
    switch (period) {
      case 'today':
        return isAfter(parsedDate, startOfDay(now));
      case 'this-week':
        return isAfter(parsedDate, startOfWeek(now, { weekStartsOn: 1 }));
      case 'this-month':
        return isAfter(parsedDate, startOfMonth(now));
      case 'this-year':
        return isAfter(parsedDate, startOfYear(now));
      default:
        return true;
    }
  }