function succesfulMockResponse() {
    return {
        data: {
            _links: {
                self: {
                    href: "/path/to/current/page"
                }
            },
            _embedded: {
                mapMarkers: [
                    {
                        _links: {
                            self: {
                                href: "/path/HotSpot/someid"
                            }
                        },
                        type: "hotspot",
                        parentID: "58b74ed117fa6d2418c8a7fe",
                        parentRelnName: "HotSpots",
                        parentRelnID: 67,
                        parentBaseClassID: "64",
                        parentBaseClassName: "I3C",
                        ReadAccess: [],
                        WriteAccess: [],
                        IndustrySector: [
                            {
                                id: "58b7550b17fa6d2418c8a80b",
                                type: "IndustrySector",
                                label: "Manufacturing"
                            }
                        ],
                        ApplicationArea: [
                            {
                                id: "58b757653c62e726a0eb38c6",
                                type: "ApplicationArea",
                                label: "Asset Monitoring"
                            }
                        ],
                        Testbeds: [],
                        ArchitecturePattern: [],
                        id: "58b75b9810d3e0278c2772ed",
                        name: "Track & Trace",
                        W2Type: "HotSpot",
                        coordinates: [
                            {
                                id: "58b75cba10d3e0278c2772f0",
                                type: "subColumn",
                                name: "Automotive"
                            },
                            {
                                id: "58b758703c62e726a0eb38cb",
                                type: "subRow",
                                name: "Overall Equipment Efficiency (OEE)"
                            }
                        ]
                    }
                ]
            },
            columns: [
                {
                    type: "column",
                    parentID: "58b74ed117fa6d2418c8a7fe",
                    parentRelnName: "IndustrySectors",
                    parentRelnID: 65,
                    parentBaseClassID: "64",
                    parentBaseClassName: "I3C",
                    ImageURL: "/public/iic_images/map/Agriculture.jpg",
                    ReadAccess: [],
                    WriteAccess: [],
                    id: "58b753ad17fa6d2418c8a806",
                    name: "Agriculture",
                    W2Type: "IndustrySector",
                    href: "/entity/IndustrySector/58b753ad17fa6d2418c8a806"
                }
            ],
            rows: [
                {
                    type: "row",
                    parentID: "58b74ed117fa6d2418c8a7fe",
                    parentRelnName: "ApplicationAreas",
                    parentRelnID: 66,
                    parentBaseClassID: "64",
                    parentBaseClassName: "I3C",
                    ReadAccess: [],
                    WriteAccess: [],
                    id: "58b757653c62e726a0eb38c6",
                    name: "Asset Monitoring",
                    W2Type: "ApplicationArea",
                    href: "/entity/ApplicationArea/58b757653c62e726a0eb38c6"
                }
            ],
            aggregations: {
                "58b756df3c62e726a0eb38c2": {
                    type: "subColumn",
                    parentID: "58b7543717fa6d2418c8a807",
                    parentRelnName: "IndustryVerticals",
                    parentRelnID: 73,
                    parentBaseClassID: "71",
                    parentBaseClassName: "IndustrySector",
                    ReadAccess: [],
                    WriteAccess: [],
                    id: "58b756df3c62e726a0eb38c2",
                    name: "Building / Construction",
                    W2Type: "IndustryVertical",
                    href: "/entity/IndustryVertical/58b756df3c62e726a0eb38c2"
                },
                "58b7595710d3e0278c2772da": {
                    type: "subRow",
                    parentID: "58b757ba3c62e726a0eb38c9",
                    parentRelnName: "UseCases",
                    parentRelnID: 76,
                    parentBaseClassID: "75",
                    parentBaseClassName: "ApplicationArea",
                    KPIs: "",
                    ReadAccess: [],
                    WriteAccess: [],
                    id: "58b7595710d3e0278c2772da",
                    name: "Throughput",
                    W2Type: "UseCase",
                    href: "/entity/UseCase/58b7595710d3e0278c2772da"
                }
            },
            selectableLinks: {
                activeSelectedType: "ApplicationArea",
                selectable: [
                    {
                        name: "StandardsOrganization",
                        href: "/map/IndustrySector/StandardsOrganization"
                    },
                    {
                        name: "TechnologyArea",
                        href: "/map/IndustrySector/TechnologyArea"
                    }
                ]
            },
            paginationSetting: {
                "hidden-xs": 3,
                "hidden-sm": 4,
                "hidden-md": 5,
                "hidden-lg": 7
            },
            copyrightYear: 1975,
            formattedMap: {}
        },
        textStatus: "success",
        jqXHR: {
            readyState: 4,
            responseText: "some text",
            responseJSON: {},
            status: 200,
            statusText: "OK"
        }
    };
}

function failedMockResponse() {
    return {
        data: undefined,
        error: {
            errorThrown: "Internal Server Error",
            textStatus: "error"
        }
    };
}

module.exports = {
    succesfulMockResponse,
    failedMockResponse
};
