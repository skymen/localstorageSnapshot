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
    async _SnapshotObj() {
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
      return data;
    }
    async _Snapshot() {
      this._lastSnapshot = JSON.stringify(await this._SnapshotObj());
      this.Trigger("OnSnapshot");
    }
    async _LoadFromSnapshotObj(data) {
      const storage = this._runtime._projectStorage;
      await storage.clear();
      await Promise.all(
        Object.keys(data).map((key) => storage.setItem(key, data[key]))
      );
    }
    async _LoadFromSnapshot(dataStr) {
      try {
        const data = JSON.parse(dataStr);
        await this._LoadFromSnapshotObj(data);
      } catch (e) {
        console.error(e);
      }
      this.Trigger("OnLoaded");
    }
    async _SaveSnapshotToFile(pathMode, path) {
      await this.PostToDOMAsync("save-to-file", [
        pathMode,
        path,
        await this._SnapshotObj(),
      ]);
    }
    async _LoadSnapshotFromFile(pathMode, path) {
      await this.PostToDOMAsync("load-from-file", [pathMode, path]);
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
