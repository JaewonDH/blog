import { reactive, ref } from '@vue/composition-api';

let Common = function(instance) {
  //export default function Common() {

  console.log('Common instance', instance);

  let instanceObject = reactive(instance);

  const HOST_ADD = ref('http://localhost:3333/');

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
    return HOST_ADD.value;
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
