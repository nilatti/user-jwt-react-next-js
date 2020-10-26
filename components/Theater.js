import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Title  from './styles/Title'
import TheaterStyles  from './styles/TheaterStyles'
import PriceTag from './styles/PriceTag'
import formatMoney from '../lib/formatMoney'
import DeleteTheater from './DeleteTheater'
class Theater extends Component {
  static propTypes = {
    theater: PropTypes.shape({
      price: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }

  render () {
    const { theater } = this.props
    return <TheaterStyles>
      {theater.image && <img src={theater.image} alt={theater.title} />}
      <Title>
        <Link href={{
          pathname: '/theater',
          query: { id: theater.id }
        }}>
          <a>
            { theater.title }
          </a>
        </Link>
      </Title>
      <PriceTag>
        {formatMoney(theater.price)}
      </PriceTag>
      <div className="buttonList">
        <Link href={{
          pathname: "update",
          query: {id: theater.id}
        }}>
          <a>
            Edit
          </a>
        </Link>
        <button>Add To Cart</button>
        <DeleteTheater id={theater.id}>Delete this theater</DeleteTheater> 
      </div>
    </TheaterStyles>
  }
}

export default Theater
