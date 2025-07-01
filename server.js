import express from 'express'
import sqlite3 from 'sqlite3'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import bodyParser from 'body-parser'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(join(__dirname, 'dist')))

// Database setup
const db = new sqlite3.Database('./users.db')

// Create users table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    artistName TEXT NOT NULL,
    avatar TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // Insert default users if they don't exist
  const defaultUsers = [
    {
      username: 'alexj',
      email: 'alex@example.com',
      password: 'password123',
      name: 'Alex Johnson',
      artistName: 'Alex J',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      username: 'sarahc',
      email: 'sarah@example.com',
      password: 'password123',
      name: 'Sarah Chen',
      artistName: 'Sarah C',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ]

  defaultUsers.forEach(user => {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err)
        return
      }
      
      db.run(
        'INSERT OR IGNORE INTO users (username, email, password, name, artistName, avatar) VALUES (?, ?, ?, ?, ?, ?)',
        [user.username, user.email, hash, user.name, user.artistName, user.avatar],
        (err) => {
          if (err) {
            console.error('Error inserting user:', err)
          } else {
            console.log(`User ${user.username} ready`)
          }
        }
      )
    })
  })
})

// Routes

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' })
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Error comparing passwords' })
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user
      res.json({ user: userWithoutPassword })
    })
  })
})

// Change password endpoint
app.post('/api/change-password', (req, res) => {
  const { userId, currentPassword, newPassword } = req.body

  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  // First, verify current password
  db.get('SELECT password FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' })
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Error comparing passwords' })
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Current password is incorrect' })
      }

      // Hash new password and update
      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: 'Error hashing new password' })
        }

        db.run('UPDATE users SET password = ? WHERE id = ?', [hash, userId], (err) => {
          if (err) {
            return res.status(500).json({ error: 'Error updating password' })
          }

          res.json({ message: 'Password updated successfully' })
        })
      })
    })
  })
})

// Get user profile
app.get('/api/user/:id', (req, res) => {
  const userId = req.params.id

  db.get('SELECT id, username, email, name, artistName, avatar FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' })
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user })
  })
})

// Update user profile
app.put('/api/user/:id', (req, res) => {
  const userId = req.params.id
  const { name, artistName, avatar } = req.body

  db.run(
    'UPDATE users SET name = ?, artistName = ?, avatar = ? WHERE id = ?',
    [name, artistName, avatar, userId],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error updating profile' })
      }

      res.json({ message: 'Profile updated successfully' })
    }
  )
})

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
}) 