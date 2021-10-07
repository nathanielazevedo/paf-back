/** @format */

import axios from "axios";

const BASE_URL = 
  "https://programafriend.herokuapp.com" || "http://localhost:3001";


class Paf {
  static token;
  static username;

  //Request builder.
  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { authorization: `Bearer ${Paf.token}` };
    const params = method === "get" ? data : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      // console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  ///////////////// USERS

  //Login
  static async login(data) {
    let res = await this.request(`auth/login`, data, "post");
    return res;
  }

  //Signup
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");

    return res;
  }

  //Get user profile
  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  //Update User Portfolio
  static async updateUserInfo(data) {
    let res = await this.request(`users/${this.username}`, data, "patch");
    return res;
  }

  ///////////////// FRIENDS

  //Add a friend for a user.
  static async addFriend(data) {
    let res = await this.request(`friends/${Paf.username}`, data, "post");
    return res;
  }

  //Get all friends for a user.
  static async getAllFriends(username) {
    let res = await this.request(`friends/${username}`);
    return res;
  }

  //Get info on a specific friend
  static async getFriendInfo(id, username) {
    let res = await this.request(`friends/${Paf.username}/${id}`);
    return res;
  }

  //Edit info on a friend
  static async editFriend(id, data) {
    let res = await this.request(
      `friends/${Paf.username}/${id}`,
      data,
      "patch"
    );
    return res;
  }

  //Delete user friend.
  static async deleteFriend(id) {
    let data;
    let res = await this.request(
      `friends/${Paf.username}/${id}`,
      data,
      "delete"
    );
    return res;
  }

  ///////////////// STATEMENTS

  //Add a statement to a friend.
  static async addFriendStatement(data) {
    let res = await this.request(`statements/${Paf.username}`, data, "post");
    return res;
  }

  //Get info on a statment.
  static async getStatementInfo(id) {
    let res = await this.request(`statements/${Paf.username}/${id}`);
    return res;
  }

  //Edit info on a statement
  static async editStatement(id, data) {
    let res = await this.request(
      `statements/${Paf.username}/${id}`,
      data,
      "patch"
    );
    return res;
  }

  //Delete a statment.
  static async deleteStatement(id) {
    let data;
    let res = await this.request(
      `statements/${Paf.username}/${id}`,
      data,
      "delete"
    );
    return res;
  }

  ///////////////// RESPONSES

  //Add a new response to a statement.
  static async addStatementResponse(data) {
    let res = await this.request(`responses/${Paf.username}`, data, "post");
    return res;
  }

  //Edit info on a response
  static async editResponse(id, data) {
    let res = await this.request(
      `responses/${Paf.username}/${id}`,
      data,
      "patch"
    );
    return res;
  }

  //Delete a response.
  static async deleteResponse(id) {
    let data;
    let res = await this.request(
      `responses/${Paf.username}/${id}`,
      data,
      "delete"
    );
    return res;
  }

  ///////////////// CHAT

  //Chat
  static async sendStatement(text) {
    let res = await this.request(`chat/${Paf.username}`, text, "post");
    return res;
  }
}

export default Paf;
