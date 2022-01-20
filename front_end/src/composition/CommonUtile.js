let Common = function(instance = null) {
  const instanceObject = instance;

  const showToastError = function(message, time) {
    showToast(message, 'error', time);
  };

  const showToastWarning = function(message, time) {
    showToast(message, 'warning', time);
  };

  const showToastSuccess = function(message, time) {
    showToast(message, 'success', time);
  };

  const showToastInformation = function(message, time) {
    showToast(message, 'information', time);
  };

  const getRouter = () => {
    return instanceObject.proxy.$router;
  };

  const getStore = () => {
    return instanceObject.proxy.$store;
  };

  const getRoute = () => {
    return instanceObject.proxy.$route;
  };

  const showToast = function(message, type, time = 2000) {
    let toastData = {
      message,
      type,
      time
    };
    getStore().commit('SHOW_TOAST', toastData);
  };

  const goToBlogList = function() {
    getRouter().push({
      name: 'BlogList'
    });
  };

  const setStoreWriteInfo = function(editMode, id) {
    getStore().commit('SET_WRITE_INFO', {
      editMode,
      id
    });
  };

  const getHost = () => {
    return process.env.VUE_APP_API_URL;
  };

  return {
    getRoute,
    getStore,
    getRouter,
    getHost,
    showToastError,
    showToastWarning,
    showToastSuccess,
    showToastInformation,
    goToBlogList,
    setStoreWriteInfo
  };
};

export default Common;
