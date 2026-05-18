import React from 'react';

/**
 * Premium About Us Page Component for Lanka Loom
 */
export default function AboutUs() {
  return (
    <div style={{
      fontFamily: 'Outfit, sans-serif',
      color: '#3E2723',
      backgroundColor: '#FDFBF7',
      minHeight: '100vh',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Hero Banner */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        background: 'linear-gradient(135deg, #5D4037 0%, #3E2723 100%)',
        borderRadius: '24px',
        padding: '60px 40px',
        color: '#FFF',
        textAlign: 'center',
        boxShadow: '0 12px 32px rgba(62, 39, 35, 0.15)',
        marginBottom: '60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)'
        }} />
        <h1 style={{
          fontSize: '42px',
          fontWeight: '800',
          marginBottom: '16px',
          letterSpacing: '1px'
        }}>Lanka Loom</h1>
        <p style={{
          fontSize: '18px',
          fontWeight: '300',
          color: '#D7CCC8',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Preserving centuries of Sri Lankan craftsmanship, empowering local artisans, and sharing authentic handmade masterpieces with the world.
        </p>
      </div>

      {/* Main Content Grid */}
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px',
        marginBottom: '60px'
      }}>
        {/* Card 1: Our Mission */}
        <div style={{
          backgroundColor: '#FFF',
          border: '1px solid #F1E6DA',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 8px 24px rgba(93, 64, 55, 0.05)',
          transition: 'transform 0.2s',
          cursor: 'default'
        }}>
          <div style={{
            fontSize: '28px',
            marginBottom: '16px',
            color: '#8D6E63'
          }}>🌾</div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#5D4037' }}>Our Mission</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#6D4C41' }}>
            To create a sustainable global digital marketplace that directly connects traditional Sri Lankan artisans, weavers, and craft creators with passionate global buyers. We bypass long supply chains to ensure creators receive fair value.
          </p>
        </div>

        {/* Card 2: Cultural Preservation */}
        <div style={{
          backgroundColor: '#FFF',
          border: '1px solid #F1E6DA',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 8px 24px rgba(93, 64, 55, 0.05)',
          transition: 'transform 0.2s',
          cursor: 'default'
        }}>
          <div style={{
            fontSize: '28px',
            marginBottom: '16px',
            color: '#8D6E63'
          }}>🏺</div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#5D4037' }}>Artisan Heritage</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#6D4C41' }}>
            Sri Lankan handloom, traditional batik, terracotta pottery, and intricate wood carving are ancestral arts passed down generations. Lanka Loom provides these creators with the digital toolkit needed to sustain their traditional crafts.
          </p>
        </div>

        {/* Card 3: Direct Impact */}
        <div style={{
          backgroundColor: '#FFF',
          border: '1px solid #F1E6DA',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 8px 24px rgba(93, 64, 55, 0.05)',
          transition: 'transform 0.2s',
          cursor: 'default'
        }}>
          <div style={{
            fontSize: '28px',
            marginBottom: '16px',
            color: '#8D6E63'
          }}>✨</div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#5D4037' }}>Ethical Standards</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#6D4C41' }}>
            We champion 100% authenticity, ethical resource sourcing, and environmentally friendly production. Every purchase made directly improves local household livelihoods and helps fund community-level artisan development.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div style={{
        maxWidth: '800px',
        width: '100%',
        textAlign: 'center',
        background: '#FFF',
        border: '1px solid #F1E6DA',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 8px 24px rgba(93, 64, 55, 0.05)'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', color: '#3E2723' }}>The Spirit of Lanka Loom</h2>
        <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#5D4037', margin: '0 auto 20px auto' }}>
          Every item you purchase has a story. Whether it is a hand-loomed saree woven in a rural cottage in Galle, a clay pottery vessel formed on a wheel in Kegalle, or a hand-drawn batik piece styled in Negombo—you are taking home a unique piece of Sri Lanka's soul.
        </p>
        <div style={{
          display: 'inline-block',
          height: '2px',
          width: '80px',
          background: '#8D6E63',
          margin: '10px 0'
        }} />
        <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#8D6E63', marginTop: '10px' }}>
          "Handmade with passion, woven with heritage."
        </p>
      </div>
    </div>
  );
}
