<script>
  import { createPopper } from "@popperjs/core";
  import { tick, onMount } from "svelte";

  let triggerEl;
  let popperEl;
  let isOpen = false;
  let placement = "left";
  let offset = [0, 16];

  let defaultPopperConfig = {
    placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset,
        },
      },
      //   {
      //     name: "arrow",
      //     options: {
      //       element: arrow,
      //     },
      //   },
    ],
  };
  function show() {
    isOpen = true;

    tick().then(() => {
      const arrow = document.querySelector(".popover-arrow");
      defaultPopperConfig.modifiers.push({
        name: "arrow",
        options: {
          element: arrow,
        },
      });
      createPopper(triggerEl, popperEl, defaultPopperConfig);
    });

    // createPopper(node, popperEl, this._getPopperConfig(attachment));
  }
  function hidden(params) {}
  function initPopper(node) {
    triggerEl = node;
    console.log(triggerEl);
    if (triggerEl) {
      triggerEl.addEventListener("click", show);
    }
  }

  onMount(() => {
    document.addEventListener("click", (e) => {
      if (!triggerEl.contains(e.target)) {
        isOpen = false;
      }
    });
  });
</script>

<button class="trigger" use:initPopper>
  <slot name="trigger"></slot>
</button>

{#if isOpen}
  <div bind:this={popperEl} class="popover">
    <slot name="content"></slot>
    <div class="popover-arrow"></div>
  </div>
{/if}

<style lang="less">
  .trigger {
    font-family: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
    background-color: transparent;
    background-image: none;
  }

  .popover {
    box-sizing: border-box;
    width: auto;
    max-width: 100vw;
    cursor: auto;
    user-select: text;
    font-weight: normal;
    white-space: normal;
    text-align: start;
    z-index: 1000;
    margin: 0;
    padding: 0;
    font-size: 14px;
    background-color: yellowgreen;
    padding: 10px;
    &-arrow {
      width: 10px;
      height: 10px;
      position: absolute;
      z-index: -1;
      right: -5px;
      top: 50%;
    //   transform: translateX(-50%);
      &::before {
        width: 10px;
        height: 10px;
        position: absolute;
        z-index: -1;
        content: "";
        transform: rotate(45deg);
        position: absolute;
        z-index: -1;

        background: yellowgreen;
        top: 0px;
        right: 0px;
        transition:
          transform 0.2s ease-out,
          visibility 0.2s ease-out;
        visibility: visible;
        transform: translateX(0px) rotate(45deg);
        transform-origin: center center;
      }
    }
  }
</style>
