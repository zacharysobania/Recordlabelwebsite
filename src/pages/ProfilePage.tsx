import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Music, Camera, Save, Edit, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

const ProfilePage: React.FC = () => {
  const { user, changePassword } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    artistName: user?.artistName || '',
    bio: 'Passionate musician creating soulful melodies that connect with listeners worldwide.',
    location: 'Los Angeles, CA',
    website: 'https://example.com',
    socialMedia: {
      instagram: '@artistname',
      twitter: '@artistname',
      facebook: 'artistname'
    }
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }))
  }

  const handleSave = () => {
    // Here you would typically save to an API
    setIsEditing(false)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long')
      return
    }

    const success = await changePassword(passwordData.currentPassword, passwordData.newPassword)
    
    if (success) {
      setPasswordSuccess('Password changed successfully!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setShowPasswordChange(false)
    } else {
      setPasswordError('Failed to change password. Please check your current password.')
    }
  }

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Artist Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your profile information and artist details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-32 w-32 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-32 w-32 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-16 w-16 text-primary-600" />
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{user?.name}</h2>
                <p className="text-gray-600 mb-4">{user?.artistName}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Music className="h-4 w-4" />
                    <span>Alternative Pop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save Changes</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="input-field disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Artist Name
                    </label>
                    <input
                      type="text"
                      name="artistName"
                      value={formData.artistName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="input-field disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="input-field disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="input-field disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>



                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="input-field disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={4}
                    className="input-field disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>

                {/* Social Media */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Social Media</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={formData.socialMedia.instagram}
                        onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Twitter
                      </label>
                      <input
                        type="text"
                        value={formData.socialMedia.twitter}
                        onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Facebook
                      </label>
                      <input
                        type="text"
                        value={formData.socialMedia.facebook}
                        onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                        disabled={!isEditing}
                        className="input-field disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="username"
                      />
                    </div>
                  </div>
                                 </div>
               </form>
             </div>
           </div>

           {/* Password Change Section */}
           <div className="card mt-8">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
               <button
                 onClick={() => setShowPasswordChange(!showPasswordChange)}
                 className="btn-primary flex items-center space-x-2"
               >
                 <Lock className="h-4 w-4" />
                 <span>{showPasswordChange ? 'Cancel' : 'Change Password'}</span>
               </button>
             </div>

             {showPasswordChange && (
               <form onSubmit={handlePasswordChange} className="space-y-6">
                 {passwordError && (
                   <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                     <AlertCircle className="h-5 w-5 text-red-500" />
                     <span className="text-red-700 text-sm">{passwordError}</span>
                   </div>
                 )}

                 {passwordSuccess && (
                   <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
                     <AlertCircle className="h-5 w-5 text-green-500" />
                     <span className="text-green-700 text-sm">{passwordSuccess}</span>
                   </div>
                 )}

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Current Password
                   </label>
                   <div className="relative">
                     <input
                       type={showPasswords.current ? 'text' : 'password'}
                       value={passwordData.currentPassword}
                       onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                       className="input-field pr-10"
                       placeholder="Enter current password"
                       required
                     />
                     <button
                       type="button"
                       onClick={() => togglePasswordVisibility('current')}
                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
                     >
                       {showPasswords.current ? (
                         <EyeOff className="h-5 w-5 text-gray-400" />
                       ) : (
                         <Eye className="h-5 w-5 text-gray-400" />
                       )}
                     </button>
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     New Password
                   </label>
                   <div className="relative">
                     <input
                       type={showPasswords.new ? 'text' : 'password'}
                       value={passwordData.newPassword}
                       onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                       className="input-field pr-10"
                       placeholder="Enter new password"
                       required
                     />
                     <button
                       type="button"
                       onClick={() => togglePasswordVisibility('new')}
                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
                     >
                       {showPasswords.new ? (
                         <EyeOff className="h-5 w-5 text-gray-400" />
                       ) : (
                         <Eye className="h-5 w-5 text-gray-400" />
                       )}
                     </button>
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Confirm New Password
                   </label>
                   <div className="relative">
                     <input
                       type={showPasswords.confirm ? 'text' : 'password'}
                       value={passwordData.confirmPassword}
                       onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                       className="input-field pr-10"
                       placeholder="Confirm new password"
                       required
                     />
                     <button
                       type="button"
                       onClick={() => togglePasswordVisibility('confirm')}
                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
                     >
                       {showPasswords.confirm ? (
                         <EyeOff className="h-5 w-5 text-gray-400" />
                       ) : (
                         <Eye className="h-5 w-5 text-gray-400" />
                       )}
                     </button>
                   </div>
                 </div>

                 <button
                   type="submit"
                   className="w-full btn-primary py-3 text-base font-medium"
                 >
                   Update Password
                 </button>
               </form>
             )}
           </div>
         </div>
       </div>
     </div>
   )
 }

export default ProfilePage 