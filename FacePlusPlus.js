const fetch = require('isomorphic-fetch');
const FormData = require('form-data');

const url = "https://api-us.faceplusplus.com/facepp/v3/compare";

/**
 * A helper class for comparing faces
 */
class FacePlusPlus {
  /**
   * Initialize FacePlusPlus module
   * @param {String} apiKey Face Plus Plus API Key
   * @param {String} apiSecret Face Plus Plus API Secret
   */
  static initialize(apiKey, apiSecret) {
    FacePlusPlus.apiKey = apiKey;
    FacePlusPlus.apiSecret = apiSecret;
  }

  /**
   * Match Faces
   * @param {String} image1 Image 1 url
   * @param {String} image2 Image 2 url
   */
  static async match(image1, image2) {
    
    if (!FacePlusPlus.apiKey || !FacePlusPlus.apiSecret) {
      throw Error("FacePlusPlus module not initialized!");
    }

    let formData = new FormData();

    const payload = {
      api_key: FacePlusPlus.apiKey,
      api_secret: FacePlusPlus.apiSecret,
      image_base64_1: image1,
      image_base64_2: image2
    };

    for (const name in payload) {
      formData.append(name, payload[name]);
    }

    const response = await fetch(url, {
        method: 'post',
        body: formData
    });

    const result = response.json();
    result.status_code = response.status;

    return result;
  }
}

module.exports = FacePlusPlus;