<script>
  import Home from "./icons/Home.svelte";
  import MenuIcon from "./icons/MenuIcon.svelte";
  import Radio from "./icons/Radio.svelte";
  import Settings from "./icons/Settings.svelte";
  import HomeActive from "./icons/HomeActive.svelte";
  import MenuIconActive from "./icons/MenuIconActive.svelte";
  import RadioActive from "./icons/RadioActive.svelte";
  import SettingsActive from "./icons/SettingsActive.svelte";
  import ToolbarItem from "./ToolbarItem.svelte";
  import HomePopover from "$lib/HomePopover.svelte";
  let items = [
    {
      icon: Home,
      hoverIcon: HomeActive,
      label: "Home",
      popover: HomePopover,
    },
    {
      icon: MenuIcon,
      hoverIcon: MenuIconActive,
      label: "MenuIcon",
    },
    {
      icon: Radio,
      hoverIcon: RadioActive,
      label: "Radio",
    },
    {
      icon: Settings,
      hoverIcon: SettingsActive,
      label: "Settings",
      onClick: () => {
        alert("123");
      },
      visible: true,
      tooltip: "设置设置设置设置设置设置",
      dot: true,
    },
    {
      icon: Settings,
      hoverIcon: SettingsActive,
      label: "Settings",
      onClick: () => {
        alert("123");
      },
      visible: false,
      tooltip: "设置",
      dot: true,
    },
  ];
</script>

<div class="toolbar">
  {#each items as item}
    <ToolbarItem
      icon={item.icon}
      label={item.label}
      tooltip={item.tooltip}
      hoverIcon={item.hoverIcon}
      onClick={item.onClick}
      visible={item.visible}
      dot={item.dot}
      popover={item.popover}
    />
  {/each}
</div>

<style lang="less">
  .toolbar {
    position: fixed;
    right: 10px;
    bottom: 0;
    transition: 0.5s ease-in-out;
    margin-bottom: 50px;
    z-index: 10;
    background: #fff;
    box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    padding: 8px;
    display: flex;
    flex-direction: column;
  }
</style>
