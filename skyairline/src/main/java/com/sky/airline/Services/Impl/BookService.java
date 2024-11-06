package com.sky.airline.Services.Impl;

import com.javainuse.employee.grpc.BookRequest;
import com.javainuse.employee.grpc.BookResponse;
import com.javainuse.employee.grpc.BookServiceGrpc;
import io.grpc.BindableService;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;

import io.grpc.Status;
import io.grpc.StatusRuntimeException;
import io.grpc.stub.StreamObserver;

@GrpcService
public class BookService extends BookServiceGrpc.BookServiceImplBase implements BindableService {

    @Override
    public void getBook(BookRequest request, StreamObserver<BookResponse> responseObserver) {
        System.out.print("Received request0: " + request);
        try {
            System.out.print("Received request: " + request.getBookId());

            // Kiểm tra xem request có hợp lệ không
//            if (request.getBookId() == null || request.getBookId().isEmpty()) {
//                // Nếu không hợp lệ, gửi lỗi về client
//                responseObserver.onError(Status.INVALID_ARGUMENT
//                        .withDescription("Book ID is required")
//                        .asRuntimeException());
//                return;
//            }

            // Xây dựng phản hồi
            BookResponse bookResponse = BookResponse.newBuilder()
                    .setBookId(request.getBookId())
                    .setName("javainuse")
                    .build();

            // Gửi phản hồi
            responseObserver.onNext(bookResponse);
            // Đánh dấu quá trình đã hoàn tất
            responseObserver.onCompleted();

        } catch (Exception e) {
            // Bắt bất kỳ ngoại lệ nào xảy ra và gửi lỗi về client
            responseObserver.onError(Status.INTERNAL
                    .withDescription("An unexpected error occurred")
                    .augmentDescription(e.getMessage())
                    .asRuntimeException());
        }
    }

    @Override
    public void getBook2(BookRequest request, StreamObserver<BookResponse> responseObserver) {
        super.getBook2(request, responseObserver);
        System.out.print(request + "dsadas");
    }
}

