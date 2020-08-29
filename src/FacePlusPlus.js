const fetch = require("isomorphic-fetch");
const FormData = require("form-data");

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
   * @param {any} image1 Image 1
   * @param {any} image2 Image 2
   * @param {{type1: "url" | "base_64" | "face_token" | "file", type2: "url" | "base_64" | "face_token" | "file", threshold: number}} options Request settings | Default -> type: url | types: "url" | "base_64" | "face_token" | "file"
   * @returns {Promise<{matched: boolean, confidence: number}>} API response
   */
  static async match(
    image1,
    image2,
    options = { type1: "url", type2: "url", threshold: 85.0 }
  ) {
    if (!FacePlusPlus.apiKey || !FacePlusPlus.apiSecret) {
      throw new Error("FacePlusPlus module not initialized!");
    }

    const types = ["url", "base_64", "face_token", "file"];
    if (!types.includes(options.type1) || !types.includes(options.type2)) {
      throw new Error(
        'Invalid options. Types must be "url" | "base_64" | "face_token" | "file"'
      );
    }

    let formData = new FormData();

    const payload = {
      api_key: FacePlusPlus.apiKey,
      api_secret: FacePlusPlus.apiSecret,
    };

    if (options.type1 === "url") {
      payload.image_url1 = image1;
    } else if (options.type1 === "base_64") {
      payload.image_base64_1 = image1;
    } else if (options.type1 === "face_token") {
      payload.face_token1 = image1;
    } else {
      payload.image_file1 = image1;
    }

    if (options.type2 === "url") {
      payload.image_url2 = image2;
    } else if (options.type2 === "base_64") {
      payload.image_base64_2 = image2;
    } else if (options.type2 === "face_token") {
      payload.face_token2 = image2;
    } else {
      payload.image_file2 = image2;
    }

    for (const name in payload) {
      formData.append(name, payload[name]);
    }

    const response = await fetch(
      "https://api-us.faceplusplus.com/facepp/v3/compare",
      {
        method: "post",
        body: formData,
      }
    );

    const result = await response.json();

    if (response.status != 200) {
      throw new Error(result.error_message);
    }

    if (!result.confidence) {
      throw new Error("No Face Detected!");
    }

    return {
      matched: result.confidence >= options.threshold,
      confidence: result.confidence,
    };
  }

  /**
   *
   * @param {any} image Image
   * @param {{type: "url" | "base_64" | "face_token" | "file", num_faces: number }} options
   * @returns {boolean} Number of facees are equal?
   */
  static async detectFace(image, options = { type: "url", num_faces: 1 }) {
    if (!FacePlusPlus.apiKey || !FacePlusPlus.apiSecret) {
      throw new Error("FacePlusPlus module not initialized!");
    }

    const types = ["url", "base_64", "face_token", "file"];
    if (!types.includes(options.type)) {
      throw new Error(
        'Invalid options. Type must be "url" | "base_64" | "face_token" | "file"'
      );
    }

    let formData = new FormData();

    const payload = {
      api_key: FacePlusPlus.apiKey,
      api_secret: FacePlusPlus.apiSecret,
    };

    if (options.type === "url") {
      payload.image_url = image;
    } else if (options.type === "base_64") {
      payload.image_base64 = image;
    } else if (options.type === "face_token") {
      payload.face_token = image;
    } else {
      payload.image_file = image;
    }

    for (const name in payload) {
      formData.append(name, payload[name]);
    }

    const response = await fetch(
      "https://api-us.faceplusplus.com/facepp/v3/detect",
      {
        method: "post",
        body: formData,
      }
    );

    const result = await response.json();
    if (response.status != 200) {
      throw new Error(result.error_message);
    }

    return result.faces.length == options.num_faces;
  }
}

module.exports = FacePlusPlus;
