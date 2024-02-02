<img src="./src/icon.svg" width="100" /><br>
# Local Storage Snapshot <br>
Description <br>
<br>
Author: skymen <br>
<sub>Made using [c3ide2-framework](https://github.com/ConstructFund/c3ide2-framework) </sub><br>

## Table of Contents
- [Usage](#usage)
- [Examples Files](#examples-files)
- [Properties](#properties)
- [Actions](#actions)
- [Conditions](#conditions)
- [Expressions](#expressions)
---
## Usage
To build the addon, run the following commands:

```
npm i
node ./build.js
```

To run the dev server, run

```
npm i
node ./dev.js
```

The build uses the pluginConfig file to generate everything else.
The main files you may want to look at would be instance.js and scriptInterface.js

## Examples Files

---
## Properties
| Property Name | Description | Type |
| --- | --- | --- |


---
## Actions
| Action | Description | Params
| --- | --- | --- |
| Snapshot | Snapshot the entire localstorage |  |
| Load from snapshot | Load from a snapshot | Snapshot             *(string)* <br> |
| Save snapshot to file | Save the snapshot to a file | Path mode             *(combo)* <br>Filename             *(string)* <br> |
| Load snapshot from file | Load the snapshot from a file | Path mode             *(combo)* <br>Filename             *(string)* <br> |


---
## Conditions
| Condition | Description | Params
| --- | --- | --- |
| On Snapshot | Triggered when a snapshot is taken |  |
| On Loaded | Triggered when a snapshot is loaded |  |


---
## Expressions
| Expression | Description | Return Type | Params
| --- | --- | --- | --- |
| LastSnapshot | Last snapshot taken | string |  | 
