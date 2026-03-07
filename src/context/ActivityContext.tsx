import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Define the shape of an activity
export interface Activity {
    id: string;
    action: string;          // e.g., "Invoice INV-001 created", "User assigned to role"
    category: 'role' | 'admin' | 'finance' | 'project' | 'client';
    subject?: string;        // e.g., "Accounts" (for role), "ABC Company" (for client)
    time: string;            // ISO timestamp is best, let's use actual creation time
    performingUser: string;  // e.g., "Admin", "Mohamed"
    path: string;            // Link to the item
}

// Define the context state
interface ActivityContextType {
    activities: Activity[];
    logActivity: (
        action: string,
        category: Activity['category'],
        path: string,
        subject?: string,
        performingUser?: string
    ) => void;
    clearActivities: () => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

// Helper to format "time ago"
export const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hrs ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return `1 day ago`;
    return `${diffInDays} days ago`;
};

export const ActivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activities, setActivities] = useState<Activity[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const storedActivities = localStorage.getItem('trek_activities');
        if (storedActivities) {
            try {
                // We keep the raw ISO timestamps in state
                setActivities(JSON.parse(storedActivities));
            } catch (error) {
                console.error("Failed to parse activities from local storage", error);
                setActivities([]);
            }
        }
    }, []);

    const logActivity = (
        action: string,
        category: Activity['category'],
        path: string,
        subject?: string,
        performingUser: string = 'Admin' // Defaulting to Admin for this scope
    ) => {
        const newActivity: Activity = {
            id: `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            action,
            category,
            path,
            subject,
            time: new Date().toISOString(), // Store actual ISO string
            performingUser
        };

        setActivities(prev => {
            const updated = [newActivity, ...prev];
            // Keep only the last 100 activities to prevent localStorage bloat
            const truncated = updated.slice(0, 100);
            localStorage.setItem('trek_activities', JSON.stringify(truncated));
            return truncated;
        });
    };

    const clearActivities = () => {
        setActivities([]);
        localStorage.removeItem('trek_activities');
    };

    return (
        <ActivityContext.Provider value={{ activities, logActivity, clearActivities }}>
            {children}
        </ActivityContext.Provider>
    );
};

export const useActivity = () => {
    const context = useContext(ActivityContext);
    if (context === undefined) {
        throw new Error('useActivity must be used within an ActivityProvider');
    }
    return context;
};
