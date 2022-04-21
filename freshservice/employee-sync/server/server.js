const { Freshteam } = require("@freshworks/api-sdk");

exports = {
  /**
   * Handler invoked with `onAppInstall` event. Creates scheduled function to run every 30 minutes.
   */
  async install() {
    try {
      await $schedule.create({
        name: "freshteam_employee_sync",
        data: {},
        schedule_at: new Date(Date.now() + 10000).toISOString(), // 10 seconds in the future
        repeat: {
          time_unit: "minutes",
          frequency: 30,
        },
      });
    } catch (err) {
      console.log(err);
    }
    renderData();
  },

  /**
   * Handler invoked `onScheduledEvent`
   * @param {object} args
   */
  async sync_records(args) {
    const domain = `${args.iparams.freshteam_domain}.freshteam.com`
    const ft = new Freshteam(domain, args.iparams.freshteam_api_key);


  },
};
