package org.example.camunda.service;

import lombok.extern.slf4j.Slf4j;
import org.example.camunda.dto.response.WebSocketNotificationEvent;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class WebSocketSseNotificationService {

    private static final long SSE_TIMEOUT_MS = TimeUnit.MINUTES.toMillis(30);
    private final Map<String, List<SseEmitter>> emittersByUsername = new ConcurrentHashMap<>();

    public SseEmitter subscribe(String username) {
        SseEmitter emitter = new SseEmitter(SSE_TIMEOUT_MS);
        emittersByUsername.computeIfAbsent(username, key -> new CopyOnWriteArrayList<>()).add(emitter);

        emitter.onCompletion(() -> removeEmitter(username, emitter));
        emitter.onTimeout(() -> removeEmitter(username, emitter));
        emitter.onError((exception) -> removeEmitter(username, emitter));

        try {
            emitter.send(SseEmitter.event()
                    .name("websocket-connected")
                    .data("connected"));
        } catch (IOException exception) {
            removeEmitter(username, emitter);
        }
        return emitter;
    }

    public void pushToUser(String username, WebSocketNotificationEvent payload) {
        List<SseEmitter> emitters = emittersByUsername.get(username);
        if (emitters == null || emitters.isEmpty()) {
            return;
        }

        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event()
                        .name("websocket-notification")
                        .data(payload));
            } catch (IOException exception) {
                removeEmitter(username, emitter);
                log.debug("Failed to push websocket notification to user={}", username, exception);
            }
        }
    }

    private void removeEmitter(String username, SseEmitter emitter) {
        List<SseEmitter> emitters = emittersByUsername.get(username);
        if (emitters == null) {
            return;
        }
        emitters.remove(emitter);
        if (emitters.isEmpty()) {
            emittersByUsername.remove(username);
        }
    }
}
