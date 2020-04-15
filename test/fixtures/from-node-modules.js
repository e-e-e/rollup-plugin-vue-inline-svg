import svg from 'octicons/build/svg/alert.svg'

expect(svg).to.be.instanceOf(Object)
expect(svg.render).to.be.instanceOf(Function)

const fakeVue = {
  _self: {},
  $createElement: spy
}
// call render method
svg.render.bind(fakeVue)()
// count the number or time create element is called by function
expect(spy.callCount).to.equal(5)
