document.onreadystatechange = function() {
  if (document.readyState === 'interactive') renderApp();
  function renderApp() {
    var onInit = app.initialized();

    onInit.then(getClient).catch(handleErr);

    function getClient(_client) {
      window.client = _client;
      client.events.on('app.activated', onAppActivate);
    }
  }
};

function onAppActivate() {
  var btn = document.querySelector('.btn-open');
  btn.addEventListener('click', openModal);
  // Start writing your code...
}

function openModal() {
  client.interface.trigger(
    'showModal',
    useTemplate('Title of the Modal', './views/modal.html')
  );
}

function useTemplate(title, template) {
  return {
    title,
    template
  };
}

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}
