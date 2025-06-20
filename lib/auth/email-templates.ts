export const emailTemplates = {
  verification: (verificationUrl: string) => ({
    subject: 'E-posta Adresinizi Doğrulayın - Kocaeli Şekerleme',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>E-posta Doğrulama</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #000000;
              color: #ffffff;
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 300;
              letter-spacing: 2px;
            }
            .content {
              padding: 40px 30px;
            }
            .content h2 {
              font-size: 20px;
              font-weight: 300;
              margin-bottom: 20px;
              color: #000;
            }
            .content p {
              margin-bottom: 20px;
              color: #666;
            }
            .button {
              display: inline-block;
              padding: 14px 30px;
              background-color: #000000;
              color: #ffffff !important;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 300;
              letter-spacing: 1px;
              margin: 20px 0;
            }
            .footer {
              background-color: #fafafa;
              padding: 30px;
              text-align: center;
              font-size: 14px;
              color: #999;
              border-top: 1px solid #eee;
            }
            .footer p {
              margin: 5px 0;
            }
            .divider {
              height: 1px;
              background-color: #eee;
              margin: 30px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>KOCAELI ŞEKERLEME</h1>
            </div>
            <div class="content">
              <h2>Hoş Geldiniz!</h2>
              <p>Kocaeli Şekerleme ailesine katıldığınız için teşekkür ederiz. E-posta adresinizi doğrulamak için aşağıdaki butona tıklayın:</p>
              
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">E-POSTA ADRESİNİ DOĞRULA</a>
              </div>
              
              <div class="divider"></div>
              
              <p style="font-size: 14px; color: #999;">
                Bu bağlantı güvenlik nedeniyle 24 saat içinde geçerliliğini yitirecektir. 
                Eğer bu e-postayı siz talep etmediyseniz, lütfen dikkate almayın.
              </p>
              
              <p style="font-size: 14px; color: #999;">
                Butona tıklayamıyorsanız, aşağıdaki bağlantıyı tarayıcınıza kopyalayın:<br>
                <span style="color: #666; word-break: break-all;">${verificationUrl}</span>
              </p>
            </div>
            <div class="footer">
              <p><strong>Kocaeli Şekerleme</strong></p>
              <p>1948'den beri geleneksel lezzetler</p>
              <p>© ${new Date().getFullYear()} Tüm hakları saklıdır.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Hoş Geldiniz!

Kocaeli Şekerleme ailesine katıldığınız için teşekkür ederiz. E-posta adresinizi doğrulamak için aşağıdaki bağlantıyı ziyaret edin:

${verificationUrl}

Bu bağlantı güvenlik nedeniyle 24 saat içinde geçerliliğini yitirecektir.

Saygılarımızla,
Kocaeli Şekerleme
    `
  }),

  passwordReset: (resetUrl: string) => ({
    subject: 'Şifre Sıfırlama Talebi - Kocaeli Şekerleme',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Şifre Sıfırlama</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #000000;
              color: #ffffff;
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 300;
              letter-spacing: 2px;
            }
            .content {
              padding: 40px 30px;
            }
            .content h2 {
              font-size: 20px;
              font-weight: 300;
              margin-bottom: 20px;
              color: #000;
            }
            .content p {
              margin-bottom: 20px;
              color: #666;
            }
            .button {
              display: inline-block;
              padding: 14px 30px;
              background-color: #000000;
              color: #ffffff !important;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 300;
              letter-spacing: 1px;
              margin: 20px 0;
            }
            .footer {
              background-color: #fafafa;
              padding: 30px;
              text-align: center;
              font-size: 14px;
              color: #999;
              border-top: 1px solid #eee;
            }
            .footer p {
              margin: 5px 0;
            }
            .divider {
              height: 1px;
              background-color: #eee;
              margin: 30px 0;
            }
            .security-notice {
              background-color: #f9f9f9;
              border-left: 4px solid #333;
              padding: 15px 20px;
              margin: 20px 0;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>KOCAELI ŞEKERLEME</h1>
            </div>
            <div class="content">
              <h2>Şifre Sıfırlama Talebi</h2>
              <p>Hesabınız için bir şifre sıfırlama talebi aldık. Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
              
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">ŞİFREYİ SIFIRLA</a>
              </div>
              
              <div class="security-notice">
                <strong>Güvenlik Uyarısı:</strong><br>
                Bu bağlantı güvenliğiniz için 1 saat içinde geçerliliğini yitirecektir. 
                Eğer bu talebi siz yapmadıysanız, lütfen bu e-postayı dikkate almayın ve hesabınızın güvenliği için şifrenizi değiştirmeyi düşünün.
              </div>
              
              <div class="divider"></div>
              
              <p style="font-size: 14px; color: #999;">
                Butona tıklayamıyorsanız, aşağıdaki bağlantıyı tarayıcınıza kopyalayın:<br>
                <span style="color: #666; word-break: break-all;">${resetUrl}</span>
              </p>
            </div>
            <div class="footer">
              <p><strong>Kocaeli Şekerleme</strong></p>
              <p>1948'den beri geleneksel lezzetler</p>
              <p>© ${new Date().getFullYear()} Tüm hakları saklıdır.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Şifre Sıfırlama Talebi

Hesabınız için bir şifre sıfırlama talebi aldık. Şifrenizi sıfırlamak için aşağıdaki bağlantıyı ziyaret edin:

${resetUrl}

Güvenlik Uyarısı: Bu bağlantı güvenliğiniz için 1 saat içinde geçerliliğini yitirecektir. 
Eğer bu talebi siz yapmadıysanız, lütfen bu e-postayı dikkate almayın.

Saygılarımızla,
Kocaeli Şekerleme
    `
  }),

  welcome: (userName: string) => ({
    subject: 'Kocaeli Şekerleme Ailesine Hoş Geldiniz!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hoş Geldiniz</title>
          <style>
            /* Same styles as above */
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>KOCAELI ŞEKERLEME</h1>
            </div>
            <div class="content">
              <h2>Hoş Geldiniz${userName ? ` ${userName}` : ''}!</h2>
              <p>E-posta adresiniz başarıyla doğrulandı. Artık Kocaeli Şekerleme ailesinin bir parçasısınız.</p>
              
              <p>1948'den beri süregelen lezzet geleneğimizi sizinle paylaşmaktan mutluluk duyuyoruz.</p>
              
              <div style="text-align: center;">
                <a href="${process.env.NEXTAUTH_URL}" class="button">ALIŞVERİŞE BAŞLA</a>
              </div>
            </div>
            <div class="footer">
              <p><strong>Kocaeli Şekerleme</strong></p>
              <p>1948'den beri geleneksel lezzetler</p>
              <p>© ${new Date().getFullYear()} Tüm hakları saklıdır.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Hoş Geldiniz${userName ? ` ${userName}` : ''}!

E-posta adresiniz başarıyla doğrulandı. Artık Kocaeli Şekerleme ailesinin bir parçasısınız.

1948'den beri süregelen lezzet geleneğimizi sizinle paylaşmaktan mutluluk duyuyoruz.

Saygılarımızla,
Kocaeli Şekerleme
    `
  })
}