import { useEditorSettingsStore } from "../../store/useSettingStore";
import { SettingsOptionsByType } from "./options";
import classes from "./settings.module.css";

export const Settings = () => {
  const changeSetting = useEditorSettingsStore((state) => state.changeSetting);
  const settings = useEditorSettingsStore((state) => state.settings);

  return (
    <main className={classes.container}>
      {SettingsOptionsByType.input.map((setting) => (
        <section className={classes.setting} key={setting.key}>
          <label>
            <h3 className={classes.settingName}> {setting.name} </h3>
            <p className={classes.settingDescription}>
              {" "}
              {setting.description}{" "}
            </p>
            <input
              type={setting.type}
              placeholder={setting.placeHolder}
              value={settings[setting.key]}
              onChange={(e) => changeSetting(setting.key, e.target.value)}
            />
          </label>
        </section>
      ))}
      {SettingsOptionsByType.select.map((setting) => (
        <section className={classes.setting} key={setting.key}>
          <label>
            <h3 className={classes.settingName}> {setting.name} </h3>
            <p className={classes.settingDescription}>
              {" "}
              {setting.description}{" "}
            </p>
            <select
              name={setting.key}
              onChange={(e) => {
                changeSetting(setting.key, e.target.value);
              }}
              value={settings[setting.key] as string}
            >
              {setting.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </section>
      ))}
    </main>
  );
};
