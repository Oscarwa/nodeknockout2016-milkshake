import { socketListen } from 'utils/sockets'

class NamesList extends Phaser.Text {
  constructor(game, x, y, text) {
    super(game, x, y, text, { 
            font: '26px Schoolbell',
            fill: '#000000'
          })

    this.game.stage.addChild(this);

    socketListen('pointsUpdated', this.updateList)
    socketListen('newUser', this.updateList)
  }

  updateList = (names) => {
    const usersList = names.reduce((prev, next) =>`${prev}${next.name}  ${next.points}\n`, '')
    this.setText(usersList)
  }
}

export default NamesList