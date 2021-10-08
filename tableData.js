const res = {
  data: {
    status: 200,
    message: "테이블 검색 성공",
    data: {
      content: [
        {
          id: 1,
          name: "테이블 1",
          numberOfPeople: 5,
          totalPrice: 15000,
          tableStatus: "OPEN",
          orders: [
            {
              id: 1,
              name: "음식1",
              orderPrice: 5000,
              count: 1,
              request: "잘부탁드립니다",
              orderStatus: "ORDER"
            },
            {
              id: 2,
              name: "음식2",
              orderPrice: 10000,
              count: 2,
              request: "잘부탁드립니다",
              orderStatus: "ORDER"
            }
          ]
        },
        {
          id: 2,
          name: "테이블 2",
          numberOfPeople: 5,
          totalPrice: 15000,
          tableStatus: "OPEN",
          orders: [
            {
              id: 1,
              name: "음식1",
              orderPrice: 5000,
              count: 1,
              request: "잘부닥드립니다2",
              orderStatus: "ORDER"
            },
            {
              id: 2,
              name: "음식2",
              orderPrice: 10000,
              count: 2,
              request: "잘부탁드립니다3",
              orderStatus: "ORDER"
            }
          ]
        },
        {
          id: 3,
          name: "테이블 3",
          numberOfPeople: 5,
          totalPrice: 15000,
          tableStatus: "OPEN",
          orders: []
        }
      ],
      pageable: {
        sort: {
          sorted: false,
          unsorted: true,
          empty: true
        },
        pageNumber: 0,
        pageSize: 10,
        offset: 0,
        paged: true,
        unpaged: false
      },
      totalPages: 1,
      totalElements: 2,
      last: true,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      first: true,
      numberOfElements: 2,
      size: 10,
      number: 0,
      empty: false
    }
  }
}