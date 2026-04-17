
Live Link : https://assignment-7-snowy.vercel.app/

# KeenKeeper - Friendship Tracker App

KeenKeeper is a simple web application that helps you track and manage your friendships. Keep track of when you last contacted your friends and never forget to reach out to the people who matter most.

## What Can You Do?

### 1. **View Your Friends**

- See all your friends in a nice card layout on the home page
- Each friend card shows their name, profile picture, and contact status
- Friend status colors: Green (On Track), Yellow (Almost Due), Red (Overdue)

### 2. **Track Interactions**

- Visit any friend's profile page
- Record interactions with three buttons: **Call**, **Text**, or **Video**
- Each interaction is logged with the date and time
- Interactions stay in memory during your session

### 3. **View Timeline**

- See all your interactions in one place
- Filter interactions by type: All, Calls, Texts, or Videos
- Each filter shows the count of interactions
- Interactions display with the friend's name, type, and when it happened

### 4. **View Analytics**

- See a pretty pie chart showing your interaction breakdown
- View how many calls, texts, and videos you've made
- See total friends connected and interaction counts
- Check individual friend statistics

## Project Structure

```
src/
├── app/
│   ├── layout.js                 # Main layout with navbar and footer
│   ├── page.js                   # Home page with friends list
│   ├── timeline/
│   │   └── page.jsx             # Timeline page with filter options
│   ├── stats/
│   │   └── page.jsx             # Stats page with pie chart
│   ├── friends/
│   │   ├── page.jsx             # All friends page
│   │   └── [friendId]/
│   │       └── page.jsx         # Individual friend details
│   ├── ClientWrapper.jsx         # Context provider wrapper
│   └── globals.css              # Global styles
├── components/
│   ├── homepage/
│   │   ├── Banner.jsx           # Homepage banner
│   │   └── FriendCard.jsx       # Friend card component
│   └── shared/
│       ├── Navbar/
│       │   ├── Navbar.jsx       # Navigation bar
│       │   └── MyLinks.jsx      # Active link indicator
│       └── Footer/
│           └── Footer.jsx       # Footer section
├── context/
│   └── InteractionsContext.jsx  # Global state for interactions
└── data/
    └── friends.json             # Sample friends data
```

## How to Use

### Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open in browser:**
   - Go to [http://localhost:3000](http://localhost:3000)

### Using the App

**On Home Page:**

- See all your friends as cards
- Click on any friend card to go to their profile

**On Friend Profile Page:**

- See friend details (name, bio, status)
- Click "Call", "Text", or "Video" buttons to record interactions
- View recent interactions at the bottom

**On Timeline Page:**

- See all interactions you've recorded
- Use filter buttons to view specific types of interactions
- Filter shows count for each type

**On Stats Page:**

- View a pie chart of your interactions
- See total statistics and unique friends
- Check individual friend statistics

## Key Features

✅ **Session-Based Data** - Interactions are stored only during your current session and cleared when you refresh  
✅ **Interactive Timeline** - Filter interactions by type with live count updates  
✅ **Visual Analytics** - Donut chart showing interaction breakdown  
✅ **Friend Profiles** - Detailed view of each friend with interaction history  
✅ **Responsive Design** - Works on mobile, tablet, and desktop

## Technologies Used

- **Frontend Framework:** Next.js 16.2.3
- **UI Library:** React 19.2.4
- **Styling:** Tailwind CSS 4, DaisyUI 5.5.19
- **Charts:** Recharts 3.8.1
- **Icons:** React Icons 5.6.0
- **State Management:** React Context API

## Installation & Setup

### Requirements

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository
2. Run `npm install` to install all packages
3. Run `npm run dev` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Important Notes

- **Data is Session-Based:** All interactions are stored in React memory. When you refresh the page or close the browser, all data is cleared.
- **No Database:** This app uses in-memory storage, so no data persists between sessions.
- **Sample Data:** The app comes with sample friends data in `src/data/friends.json`.

## File Naming & Conventions

- Client components use `"use client"` directive
- All React components are in `.jsx` format
- Context is stored in `src/context/`
- Reusable components organized by sections in `src/components/`

## Features Explained

### Homepage

- Displays all friends in a grid
- Shows friend cards with status indicators
- Quick overview of your friendship network

### Friend Details Page

- View complete friend information
- Record interactions (Call, Text, Video)
- See recent interactions at a glance

### Timeline Page

- Complete interaction history
- Filter by interaction type
- Shows date and time for each interaction

### Stats Page

- Visual pie chart of interactions
- Summary statistics
- Friend-specific breakdown

## Tips

1. Click on a friend card to view their full profile
2. Use timeline filters to focus on specific interaction types
3. Check stats to see your interaction patterns
4. Record interactions right after you contact a friend

---

**Enjoy tracking your friendships with KeenKeeper!** 💚
