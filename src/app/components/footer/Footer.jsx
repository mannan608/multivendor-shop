
const Footer = () => {
    return (
        <>
            <div className='desktop_footer'>
                <footer className="bg-white border-t border-gray-200">
                    <div className="px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-8">

                            <div className="col-span-2 sm:col-span-1 space-y-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-indigo-600 text-3xl font-bold">~</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Making the world a better place through constructing elegant hierarchies.
                                </p>
                                <div className="flex space-x-4 mt-4">
                                    <a href="#">
                                        <i className="fab fa-facebook text-gray-500 hover:text-gray-800" />
                                    </a>
                                    <a href="#">
                                        <i className="fab fa-instagram text-gray-500 hover:text-gray-800" />
                                    </a>
                                    <a href="#">
                                        <i className="fab fa-x-twitter text-gray-500 hover:text-gray-800" />
                                    </a>
                                    <a href="#">
                                        <i className="fab fa-github text-gray-500 hover:text-gray-800" />
                                    </a>
                                    <a href="#">
                                        <i className="fab fa-youtube text-gray-500 hover:text-gray-800" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Solutions</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><a href="#" className="hover:text-gray-900">Marketing</a></li>
                                    <li><a href="#" className="hover:text-gray-900">Analytics</a></li>
                                    <li><a href="#" className="hover:text-gray-900">Automation</a></li>
                                    <li><a href="#" className="hover:text-gray-900">Commerce</a></li>
                                    <li><a href="#" className="hover:text-gray-900">Insights</a></li>
                                </ul>
                            </div>

                            <div className="col-span-1">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><a href="#" className="hover:text-gray-900">Submit ticket</a></li>
                                    <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
                                    <li><a href="#" className="hover:text-gray-900">Guides</a></li>
                                </ul>
                            </div>

                            <div className="col-span-1">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><a href="#" className="hover:text-gray-900">About</a></li>
                                    <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                                    <li><a href="#" className="hover:text-gray-900">Jobs</a></li>
                                    <li><a href="#" className="hover:text-gray-900">Press</a></li>
                                </ul>
                            </div>

                            <div className="col-span-1">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><a href="#" className="hover:text-gray-900">Terms of service</a></li>
                                    <li><a href="#" className="hover:text-gray-900">Privacy policy</a></li>
                                    <li><a href="#" className="hover:text-gray-900">License</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-sm text-gray-500">
                            © 2025 ABC, Inc. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer