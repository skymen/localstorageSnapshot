function getInstanceJs(parentClass, scriptInterface, addonTriggers, C3) {
  return class extends parentClass {
    constructor(inst, properties) {
      super(inst);
      this._lastSnapshot = "";

      if (properties) {
      }
    }

    SaveToJson() {
      return {
        // data to be saved for savegames
      };
    }

    LoadFromJson(o) {
      // load state for savegames
    }
    // ==== ACES ====
    async _Snapshot() {
      const storage = this._runtime._projectStorage;
      const keys = await storage.keys();
      const data = {};
      await Promise.all(
        keys.map((key) =>
          storage.getItem(key).then((value) => {
            data[key] = value;
          })
        )
      );
      this._lastSnapshot = JSON.stringify(data);
      this.Trigger("OnSnapshot");
    }
    async _LoadFromSnapshot(dataStr) {
      try {
        const data = JSON.parse(dataStr);
        const storage = this._runtime._projectStorage;
        await storage.clear();
        await Promise.all(
          Object.keys(data).map((key) => storage.setItem(key, data[key]))
        );
      } catch (e) {
        console.error(e);
      }
      this.Trigger("OnLoaded");
    }
    _OnSnapshot() {
      return true;
    }
    _OnLoaded() {
      return true;
    }
    _LastSnapshot() {
      return this._lastSnapshot;
    }
  };
}
