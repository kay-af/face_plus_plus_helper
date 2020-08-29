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
   * @param {{type: String}} options Request settings | Default -> type: url | types: "url" | "base_64" | "face_token"
   * @returns {Promise<any>} API response
   */
  static async match(image1, image2, options = { type: "url" }) {

      const types = ["url", "base_64", "face_token"];
      if(!types.includes(options.type)) {
        throw new Error("Invalid options. Type must be \"url\" | \"base_64\" | \"face_token\"");
      }

      if (!FacePlusPlus.apiKey || !FacePlusPlus.apiSecret) {
        throw new Error("FacePlusPlus module not initialized!");
      }

      let formData = new FormData();

      const payload = {
        api_key: FacePlusPlus.apiKey,
        api_secret: FacePlusPlus.apiSecret
      };

      if(options.type === "url") {
        payload.image_url1 = image1;
        payload.image_url2 = image2;
      } else if(options.type === "base_64") {
        payload.image_base64_1 = image1;
        payload.image_base64_2 = image2;
      } else {
        payload.face_token1 = image1;
        payload.face_token2 = image2;
      }

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