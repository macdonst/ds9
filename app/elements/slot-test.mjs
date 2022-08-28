export default function SlotTest({ html, state }) {
    const { attrs } = state
    console.log(JSON.stringify(state))
    return html`
    <slot></slot>
    `
  }
