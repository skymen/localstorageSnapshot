function getScriptInterface(parentClass, map) {
  return class extends parentClass {
    constructor() {
      super();
      map.set(this, parentClass._GetInitInst().GetSdkInstance());
    }

    loadSnapshotObj(data) {
      const inst = map.get(this);
      return inst._LoadFromSnapshotObj(data);
    }

    snapshotObj() {
      const inst = map.get(this);
      return inst._SnapshotObj();
    }
  };
}
