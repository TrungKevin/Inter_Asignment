package org.example.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
//Cấu hình thread pool cho export 
// (giới hạn song song, tránh bắn quá nhiều job cùng lúc
public class AsyncConfiguration {

    @Bean(name = "reportExportExecutor")
    public Executor reportExportExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(2);
        executor.setQueueCapacity(50);
        executor.setThreadNamePrefix("report-export-");
        executor.initialize();
        return executor;
    }
}
