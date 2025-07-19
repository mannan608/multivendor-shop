
import BottomNavMenu from './BottomNavMenu'
import ShowHeader from './ShowHeader'

const Header = () => {
    return (
        <>
            <div className='sticky top-0 z-50' >
                <ShowHeader />
            </div>
            <div className='mobile_menu'>
                <BottomNavMenu />
            </div>
        </>
    )
}

export default Header