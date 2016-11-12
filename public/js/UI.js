export function renderNameInfo(game){
  this.namesList = game.make.bitmapData(800, 600)
  this.namesList.context.font = '16px Arial'
  this.namesList.context.fillStyle = '#ffffff'
  this.namesList.addToWorld()

  this.nameMsg = this.game.make.bitmapData(800, 200)
  this.nameMsg.context.font = '32px Arial'
  this.nameMsg.context.fillStyle = '#ffffff'
  this.nameMsg.context.fillText(constants.ENTER_NAME_MSG, 64, 64)
  this.nameMsg.addToWorld()

  this.bmd = this.game.make.bitmapData(800,200)
  this.bmd.context.font = '64px Arial'
  this.bmd.context.fillStyle = '#ffffff'
  this.bmd.context.fillText(username, 64, 128)
  this.bmd.addToWorld()
}