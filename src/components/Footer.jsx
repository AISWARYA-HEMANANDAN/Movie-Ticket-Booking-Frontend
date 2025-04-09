import React from 'react'

function Footer() {
  return (
    <div style={{ padding: '1rem', marginTop: '2rem', backgroundColor: 'grey', borderTop: '1px solid #ddd', textAlign: 'center', color: 'white' }}>
      <p>&copy; {new Date().getFullYear()} MovieTime. All rights reserved.</p>
    </div>
  )
}

export default Footer
