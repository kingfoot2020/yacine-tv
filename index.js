
import crypto from 'crypto';

export default function handler(req, res) {
  const secret_key = 'xxxxxx';
  let kt = 'xxxxxx'; // This is the encrypted key

  // Get the current UTC time
  const current_time = Math.floor(Date.now() / 1000);
  
  // Decrypt 'kt' value (simulating the decrypt function in PHP)
  kt = decrypt(kt);

  // Calculate time difference in minutes
  const seconds_diff = current_time - kt;
  const minutes = seconds_diff / 60;

  // If the time difference exceeds 3 minutes, we should proceed
  if (minutes > 3) {
    const ip = getIpAddress(req);
    const str = `${ip}${secret_key}`;
    
    // Encrypt the string (mimicking the PHP behavior)
    let encryptedStr = encrypt(str);
    
    // Return the response as JSON
    res.status(200).json({ key: encryptedStr });
  } else {
    res.status(400).json({ error: 'Token expired' });
  }
}

// Decrypt function
function decrypt(str) {
  const buffer = Buffer.from(str, 'base64');
  return buffer.toString('hex');
}

// Encrypt function
function encrypt(str) {
  const hexStr = Buffer.from(str, 'utf-8').toString('hex');
  const encrypted = Buffer.from(hexStr, 'hex').toString('base64');
  return encrypted.replace(/=/g, '').toLowerCase();
}

// Get IP address from request headers (similar to PHP's get_ip_address function)
function getIpAddress(req) {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (Array.isArray(ip)) {
    ip = ip[0];
  }
  return ip;
}
