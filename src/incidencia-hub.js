import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
export default {
  install(Vue) {
    const connection = new HubConnectionBuilder()
      .withUrl(`${Vue.prototype.$http.defaults.baseURL}/incidencia-hub`)
      .configureLogging(LogLevel.Information)
      .build();

    const incidenciaHub = new Vue(); // use new Vue instance as an event bus

    // Add the hub to the Vue prototype, so every component can listen to events or send new events using this.$questionHub
    Vue.prototype.$incidenciaHub = incidenciaHub;

    // Forward hub events through the event, so we can listen for them in the Vue components
    connection.on("IncidenciaAdded", incidencia => {
      incidenciaHub.$emit("incidencia-added", { incidencia });
    });

    // You need to call connection.start() to establish the connection
    // the client wont handle reconnecting for you! Docs recommend listening onclose
    // and handling it there. This is the simplest of the strategies
    let startedPromise = null;
    function start() {
      startedPromise = connection.start().catch(err => {
        console.error("Failed to connect with hub", err);
        return new Promise((resolve, reject) =>
          setTimeout(
            () =>
              start()
                .then(resolve)
                .catch(reject),
            5000
          )
        );
      });
      return startedPromise;
    }
    connection.onclose(() => start());

    start();
  }
};
