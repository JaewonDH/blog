import Api from './index';

class BoardApi extends Api {
  getTagList() {
    return this.axios.get('tagList');
  }

  getBoardList(tagID) {
    return this.axios.get('boardList/' + tagID);
  }

  getBoardInfo(id) {
    return this.axios.get('boardInfo/' + id);
  }

  deleteBoard(id) {
    return this.axios.delete('board/' + id);
  }

  writeBoard(id, formData) {
    return this.axios.post(`boardInfo/${id}`, formData);
  }

  updateBoard(formData) {
    return this.axios.put('write', formData);
  }
}

export default BoardApi;
