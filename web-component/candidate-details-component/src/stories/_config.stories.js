export default {
    title: 'Config',
    previewTabs: {
        showDocs: false,
      }
};

export const Config = () => {
    return `
    <style>
    .config-container input[type=text], input[type=number], select {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-top: 6px;
        margin-bottom: 16px;
        resize: vertical;
      }

      .config-container input[type=submit] {
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .config-container input[type=submit]:hover {
        background-color: #45a049;
      }

      .config-container {
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;
      }
    </style>

    <div class="config-container" id="configId">
        <form name="tcEnvForm" action="javascript:void(0)" onsubmit="setEnvConfigurations()">
            <label for="lname">Hotel ID</label>
            <input type="number" id="hotelId" value="1098" name="hotelId" placeholder="Hotel ID..">

            <label for="country">Environment</label>
            <select id="env" name="tcEnv">
                <option value="t1">T1</option>
                <option value="t4">T4</option>
                <option value="t5">T5</option>
                <option value="t6">T6</option>
            </select>
            <input type="submit" value="Submit">
        </form>
    </div

    `;
}