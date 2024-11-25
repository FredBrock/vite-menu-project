<script>
  import { createEventDispatcher, tick } from "svelte";
  import { createPopper } from "@popperjs/core";
  // import * as Popover from "$lib/components/ui/popover";
  import Popover from "../popover/Popover.svelte";
  const dispatch = createEventDispatcher();
  export let icon;
  export let hoverIcon;
  export let label;
  export let hideLabel = true; // 是否隐藏标签，默认为 true
  export let onClick = () => {};
  export let tooltip;
  export let visible = true; //工具栏图标显隐
  export let dot = false;
  export let popover;
  let popperInstance;
  let referenceEl;
  let popperEl;
  // 控制鼠标悬停状态
  let hover = false;
  async function onMouseenter(e) {
    hover = true; // 鼠标移入
    await tick();
    showTooltip();
  }
  async function onMouseleave(params) {
    hover = false; // 鼠标移出
    await tick();
    hiddenTooltip();
  }
  function handleClick(params) {
    onClick();
    // dispatch("onClick");
  }

  function showTooltip() {
    if (tooltip && !popperInstance && popperEl) {
      console.log(referenceEl);
      console.log(popperEl);

      // 初始化 Popper
      popperInstance = createPopper(referenceEl, popperEl, {
        placement: "left", // 提示框在上方
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 16], // 调整偏移量
            },
          },
          { name: "arrow" },
        ],
      });
    }
  }
  function hiddenTooltip() {
    if (popperInstance) {
      popperInstance.destroy();
      popperInstance = null;
    }
  }
  function onKeydown(params) {}
  function onFocus(params) {}
</script>

{#if visible}
  <Popover>
    <div
      class="toolbar-item"
      slot="trigger"
      bind:this={referenceEl}
      on:click={handleClick}
      on:mouseenter={onMouseenter}
      on:mouseleave={onMouseleave}
    >
      <i class="toolbar-item-icon">
        {#if hover}
          <svelte:component this={hoverIcon}></svelte:component>
        {:else}
          <svelte:component this={icon}></svelte:component>
        {/if}

        {#if dot}
          <sup class="toolbar-item-dot"></sup>
        {/if}
      </i>

      {#if !hideLabel}
        <span class="toolbar-item-label" class:hover>{label}</span>
      {/if}

      <!-- 浮动提示框 -->
      {#if tooltip && hover}
        <div class="tooltip" bind:this={popperEl}>
          {tooltip}
          <div data-popper-arrow></div>
        </div>
      {/if}
    </div>
    <div slot="content" class="popover-content">
      Place content for the popover here.
      <svelte:component this={popover}></svelte:component>
    </div>
  </Popover>
{/if}

<style lang="less">
  .toolbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 62px;
    width: 48px;
    margin-bottom: 4px;
    cursor: pointer;
    &-label {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      font-size: 14px;
    }
    &-icon {
      position: relative;
    }
    &-dot {
      position: absolute;
      top: 0;
      inset-inline-end: 0;
      transform: translate(50%, -50%);
      transform-origin: 100% 0%;
      width: 6px;
      height: 6px;
      background: #ff4d4f;
      border-radius: 100%;
    }
    .hover {
      color: blue;
    }
  }
  .tooltip {
    background: #303133;
    color: #fff;
    width: max-content;
    padding: 8px 16px;
    border-radius: 2px;
    font-size: 12px;
  }

  .popover-content {
    width: 500px;
    height: 200px;
  }
</style>
