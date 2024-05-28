const calculateSegments = (body, encoding) => {
    const segmentSize = encoding === 'GSM-7' ? 160 : 70;
    const segments = [];
  
    for (let i = 0; i < body.length; i += segmentSize) {
      segments.push(body.substring(i, i + segmentSize));
    }
    
    return segments;
  };
  
  module.exports = calculateSegments;
  